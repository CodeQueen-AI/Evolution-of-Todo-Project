import pytest
from httpx import AsyncClient
from backend.main import app
from backend.database import get_db
from backend.models.task import Task
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock, MagicMock
from datetime import datetime, timezone

@pytest.fixture(name="mock_db_session")
def mock_db_session_fixture():
    session = AsyncMock(spec=AsyncSession)
    session.execute.return_value = MagicMock()
    session.execute.return_value.scalars.return_value.first.return_value = None
    session.refresh.side_effect = lambda obj: setattr(obj, 'id', 1)
    return session

@pytest.fixture(name="client")
async def client_fixture(mock_db_session: AsyncMock):
    app.dependency_overrides[get_db] = lambda: mock_db_session
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_create_task_success(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_data = {"title": "Test Task", "description": "Description for test task"}
    token = "mock_jwt_token"

    mock_db_session.add.return_value = None
    mock_db_session.commit.return_value = None
    
    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.post(
        f"/api/{user_id}/tasks",
        json=task_data,
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 201
    created_task = response.json()
    assert created_task["title"] == task_data["title"]
    assert created_task["description"] == task_data["description"]
    assert created_task["user_id"] == user_id
    assert created_task["id"] == 1
    assert created_task["completed"] is False
    assert "created_at" in created_task
    assert "updated_at" in created_task

    mock_db_session.add.assert_called_once()
    mock_db_session.commit.assert_called_once()
    mock_db_session.refresh.assert_called_once()


@pytest.mark.asyncio
async def test_create_task_validation_error(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_data = {"title": "a" * 201, "description": "Description"}
    token = "mock_jwt_token"

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.post(
        f"/api/{user_id}/tasks",
        json=task_data,
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 422
    assert "detail" in response.json()
    assert "title" in response.json()["detail"][0]["loc"]

@pytest.mark.asyncio
async def test_list_tasks_success(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    token = "mock_jwt_token"

    task1 = Task(id=1, user_id=user_id, title="Task A", completed=False, created_at=datetime.now(timezone.utc))
    task2 = Task(id=2, user_id=user_id, title="Task B", completed=True, created_at=datetime.now(timezone.utc))
    
    mock_db_session.execute.return_value.scalars.return_value.all.return_value = [task1, task2]

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.get(
        f"/api/{user_id}/tasks",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 200
    tasks = response.json()
    assert len(tasks) == 2
    assert tasks[0]["title"] == "Task A"
    assert tasks[1]["title"] == "Task B"


@pytest.mark.asyncio
async def test_list_tasks_filter_completed(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    token = "mock_jwt_token"

    task1 = Task(id=1, user_id=user_id, title="Task A", completed=True, created_at=datetime.now(timezone.utc))
    
    mock_db_session.execute.return_value.scalars.return_value.all.return_value = [task1]

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.get(
        f"/api/{user_id}/tasks?completed=true",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 200
    tasks = response.json()
    assert len(tasks) == 1
    assert tasks[0]["title"] == "Task A"
    assert tasks[0]["completed"] is True

@pytest.mark.asyncio
async def test_list_tasks_sort_desc(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    token = "mock_jwt_token"

    task1 = Task(id=1, user_id=user_id, title="Task A", created_at=datetime(2023, 1, 2, tzinfo=timezone.utc))
    task2 = Task(id=2, user_id=user_id, title="Task B", created_at=datetime(2023, 1, 1, tzinfo=timezone.utc))
    
    mock_db_session.execute.return_value.scalars.return_value.all.return_value = [task1, task2]

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.get(
        f"/api/{user_id}/tasks?sort_by=created_at&order=desc",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 200
    tasks = response.json()
    assert len(tasks) == 2
    assert tasks[0]["title"] == "Task A"
    assert tasks[1]["title"] == "Task B"


@pytest.mark.asyncio
async def test_get_task_by_id_success(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 1
    token = "mock_jwt_token"

    task = Task(id=task_id, user_id=user_id, title="Test Task", created_at=datetime.now(timezone.utc))
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = task
    mock_db_session.execute.return_value = mock_result

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.get(
        f"/api/{user_id}/tasks/{task_id}",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 200
    retrieved_task = response.json()
    assert retrieved_task["id"] == task_id
    assert retrieved_task["user_id"] == user_id


@pytest.mark.asyncio
async def test_get_task_by_id_not_found(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 99
    token = "mock_jwt_token"

    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = None
    mock_db_session.execute.return_value = mock_result

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.get(
        f"/api/{user_id}/tasks/{task_id}",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 404
    assert "detail" in response.json()
    assert "Task not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_get_task_by_id_forbidden(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 1
    other_user_id = "other_user"
    token = "mock_jwt_token_for_other_user"

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: other_user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: other_user_id if user_id_param != other_user_id else user_id_param

    response = await client.get(
        f"/api/{user_id}/tasks/{task_id}",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 403
    assert "detail" in response.json()
    assert "Not authorized to access this user's resources" in response.json()["detail"]


@pytest.mark.asyncio
async def test_update_task_success(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 1
    token = "mock_jwt_token"
    update_data = {"title": "Updated Title", "description": "Updated Description"}

    existing_task = Task(id=task_id, user_id=user_id, title="Old Title", description="Old Description", created_at=datetime.now(timezone.utc))
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = existing_task
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.put(
        f"/api/{user_id}/tasks/{task_id}",
        json=update_data,
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 200
    updated_task = response.json()
    assert updated_task["title"] == update_data["title"]
    assert updated_task["description"] == update_data["description"]
    mock_db_session.commit.assert_called_once()
    mock_db_session.refresh.assert_called_once_with(existing_task)


@pytest.mark.asyncio
async def test_update_task_not_found(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 99
    token = "mock_jwt_token"
    update_data = {"title": "Updated Title"}

    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = None
    mock_db_session.execute.return_value = mock_result

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.put(
        f"/api/{user_id}/tasks/{task_id}",
        json=update_data,
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 404
    assert "detail" in response.json()
    assert "Task not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_update_task_forbidden(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 1
    other_user_id = "other_user"
    token = "mock_jwt_token_for_other_user"
    update_data = {"title": "Updated Title"}

    existing_task = Task(id=task_id, user_id=user_id, title="Old Title", created_at=datetime.now(timezone.utc))
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = existing_task
    mock_db_session.execute.return_value = mock_result

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: other_user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: other_user_id if user_id_param != other_user_id else user_id_param

    response = await client.put(
        f"/api/{user_id}/tasks/{task_id}",
        json=update_data,
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 403
    assert "detail" in response.json()
    assert "Not authorized to access this user's resources" in response.json()["detail"]


@pytest.mark.asyncio
async def test_delete_task_success(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 1
    token = "mock_jwt_token"

    existing_task = Task(id=task_id, user_id=user_id, title="Task to Delete", created_at=datetime.now(timezone.utc))
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = existing_task
    mock_db_session.execute.return_value = mock_result
    mock_db_session.delete.return_value = None
    mock_db_session.commit.return_value = None

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.delete(
        f"/api/{user_id}/tasks/{task_id}",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 204
    mock_db_session.delete.assert_called_once_with(existing_task)
    mock_db_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_delete_task_not_found(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 99
    token = "mock_jwt_token"

    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = None
    mock_db_session.execute.return_value = mock_result

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.delete(
        f"/api/{user_id}/tasks/{task_id}",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 404
    assert "detail" in response.json()
    assert "Task not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_delete_task_forbidden(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 1
    other_user_id = "other_user"
    token = "mock_jwt_token_for_other_user"

    existing_task = Task(id=task_id, user_id=user_id, title="Task to Delete", created_at=datetime.now(timezone.utc))
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = existing_task
    mock_db_session.execute.return_value = mock_result

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: other_user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: other_user_id if user_id_param != other_user_id else user_id_param

    response = await client.delete(
        f"/api/{user_id}/tasks/{task_id}",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 403
    assert "detail" in response.json()
    assert "Not authorized to access this user's resources" in response.json()["detail"]


@pytest.mark.asyncio
async def test_toggle_task_completion_success(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 1
    token = "mock_jwt_token"

    existing_task = Task(id=task_id, user_id=user_id, title="Task to Toggle", completed=False, created_at=datetime.now(timezone.utc))
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = existing_task
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.patch(
        f"/api/{user_id}/tasks/{task_id}/complete",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 200
    toggled_task = response.json()
    assert toggled_task["completed"] is True
    mock_db_session.commit.assert_called_once()
    mock_db_session.refresh.assert_called_once_with(existing_task)


@pytest.mark.asyncio
async def test_toggle_task_completion_not_found(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 99
    token = "mock_jwt_token"

    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = None
    mock_db_session.execute.return_value = mock_result

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: user_id_param

    response = await client.patch(
        f"/api/{user_id}/tasks/{task_id}/complete",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 404
    assert "detail" in response.json()
    assert "Task not found" in response.json()["detail"]


@pytest.mark.asyncio
async def test_toggle_task_completion_forbidden(client: AsyncClient, mock_db_session: AsyncMock):
    user_id = "test_user_1"
    task_id = 1
    other_user_id = "other_user"
    token = "mock_jwt_token_for_other_user"

    existing_task = Task(id=task_id, user_id=user_id, title="Task to Toggle", created_at=datetime.now(timezone.utc))
    
    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = existing_task
    mock_db_session.execute.return_value = mock_result

    from backend.middleware.auth import get_current_user, verify_user_ownership
    app.dependency_overrides[get_current_user] = lambda: other_user_id
    app.dependency_overrides[verify_user_ownership] = lambda user_id_param=user_id: other_user_id if user_id_param != other_user_id else user_id_param

    response = await client.patch(
        f"/api/{user_id}/tasks/{task_id}/complete",
        headers={"Authorization": f"Bearer {token}"}
    )

    app.dependency_overrides.pop(get_current_user)
    app.dependency_overrides.pop(verify_user_ownership)

    assert response.status_code == 403
    assert "detail" in response.json()
    assert "Not authorized to access this user's resources" in response.json()["detail"]