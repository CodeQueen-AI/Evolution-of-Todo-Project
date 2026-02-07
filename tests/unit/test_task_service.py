import pytest
from datetime import datetime, timezone
from unittest.mock import AsyncMock, MagicMock
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.task import Task
from backend.services.task_service import TaskService
from sqlalchemy import select

@pytest.fixture
def mock_db_session():
    return AsyncMock(spec=AsyncSession)

@pytest.fixture
def task_service(mock_db_session):
    return TaskService(mock_db_session)

@pytest.mark.asyncio
async def test_create_task(task_service, mock_db_session):
    user_id = "test_user"
    title = "Test Task"
    description = "Test Description"

    mock_db_session.add.return_value = None
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.side_effect = lambda obj: setattr(obj, 'id', 1)

    task = await task_service.create_task(user_id, title, description)

    mock_db_session.add.assert_called_once()
    mock_db_session.commit.assert_called_once()
    mock_db_session.refresh.assert_called_once_with(task)

    assert task.user_id == user_id
    assert task.title == title
    assert task.description == description
    assert task.id == 1
    assert not task.completed
    assert isinstance(task.created_at, datetime)
    assert isinstance(task.updated_at, datetime)


@pytest.mark.asyncio
async def test_get_tasks_all(task_service, mock_db_session):
    user_id = "test_user"
    tasks_data = [
        Task(id=1, user_id=user_id, title="Task 1", completed=False, created_at=datetime.now(timezone.utc)),
        Task(id=2, user_id=user_id, title="Task 2", completed=True, created_at=datetime.now(timezone.utc)),
    ]

    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = tasks_data
    mock_db_session.execute.return_value = mock_result

    tasks = await task_service.get_tasks(user_id)

    mock_db_session.execute.assert_called_once()
    assert len(tasks) == 2
    assert tasks[0].title == "Task 1"
    assert tasks[1].title == "Task 2"


@pytest.mark.asyncio
async def test_get_tasks_completed(task_service, mock_db_session):
    user_id = "test_user"
    tasks_data = [
        Task(id=2, user_id=user_id, title="Task 2", completed=True, created_at=datetime.now(timezone.utc)),
    ]

    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = tasks_data
    mock_db_session.execute.return_value = mock_result

    tasks = await task_service.get_tasks(user_id, completed=True)

    mock_db_session.execute.assert_called_once()
    assert len(tasks) == 1
    assert tasks[0].title == "Task 2"
    assert tasks[0].completed is True

@pytest.mark.asyncio
async def test_get_tasks_sorted_desc(task_service, mock_db_session):
    user_id = "test_user"
    task1 = Task(id=1, user_id=user_id, title="Task A", created_at=datetime(2023, 1, 1, tzinfo=timezone.utc))
    task2 = Task(id=2, user_id=user_id, title="Task B", created_at=datetime(2023, 1, 2, tzinfo=timezone.utc))
    tasks_data = [task2, task1] # Expecting descending order

    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = tasks_data
    mock_db_session.execute.return_value = mock_result

    tasks = await task_service.get_tasks(user_id, sort_by="created_at", order="desc")

    mock_db_session.execute.assert_called_once()
    assert len(tasks) == 2
    assert tasks[0].title == "Task B"
    assert tasks[1].title == "Task A"


@pytest.mark.asyncio
async def test_get_task_by_id_success(task_service, mock_db_session):
    user_id = "test_user"
    task_id = 1
    task = Task(id=task_id, user_id=user_id, title="Test Task", created_at=datetime.now(timezone.utc))

    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = task
    mock_db_session.execute.return_value = mock_result

    found_task = await task_service.get_task_by_id(task_id, user_id)

    mock_db_session.execute.assert_called_once()
    assert found_task is not None
    assert found_task.id == task_id
    assert found_task.user_id == user_id


@pytest.mark.asyncio
async def test_get_task_by_id_not_found(task_service, mock_db_session):
    user_id = "test_user"
    task_id = 99

    mock_result = MagicMock()
    mock_result.scalars.return_value.first.return_value = None
    mock_db_session.execute.return_value = mock_result

    found_task = await task_service.get_task_by_id(task_id, user_id)

    mock_db_session.execute.assert_called_once()
    assert found_task is None


@pytest.mark.asyncio
async def test_update_task_title(task_service, mock_db_session):
    user_id = "test_user"
    task = Task(id=1, user_id=user_id, title="Old Title", created_at=datetime.now(timezone.utc))

    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    updated_task = await task_service.update_task(task, title="New Title")

    mock_db_session.commit.assert_called_once()
    mock_db_session.refresh.assert_called_once_with(task)
    assert updated_task.title == "New Title"
    assert updated_task.user_id == user_id # Ensure user_id is unchanged


@pytest.mark.asyncio
async def test_delete_task(task_service, mock_db_session):
    user_id = "test_user"
    task = Task(id=1, user_id=user_id, title="Task to Delete", created_at=datetime.now(timezone.utc))

    mock_db_session.delete.return_value = None
    mock_db_session.commit.return_value = None

    await task_service.delete_task(task)

    mock_db_session.delete.assert_called_once_with(task)
    mock_db_session.commit.assert_called_once()


@pytest.mark.asyncio
async def test_toggle_task_completion(task_service, mock_db_session):
    user_id = "test_user"
    task = Task(id=1, user_id=user_id, title="Task to Toggle", completed=False, created_at=datetime.now(timezone.utc))

    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    toggled_task = await task_service.toggle_task_completion(task)

    mock_db_session.commit.assert_called_once()
    mock_db_session.refresh.assert_called_once_with(task)
    assert toggled_task.completed is True

    # Toggle again
    toggled_task = await task_service.toggle_task_completion(toggled_task)
    assert toggled_task.completed is False