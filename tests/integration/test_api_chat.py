import pytest
from httpx import AsyncClient
from main import app
from sqlalchemy.ext.asyncio import AsyncSession
from backend.database import get_db
from unittest.mock import AsyncMock, patch

# Mock dependency for testing get_db
async def override_get_db():
    async_mock_session = AsyncMock(spec=AsyncSession)
    yield async_mock_session

app.dependency_overrides[get_db] = override_get_db

# Mock for get_current_user_id to simulate different authentication scenarios
def mock_get_current_user_id_valid():
    return 1 # Simulate user ID 1 is authenticated

def mock_get_current_user_id_invalid_token():
    from fastapi import HTTPException, status
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")

def mock_get_current_user_id_no_token():
    from fastapi import HTTPException, status
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")


TEST_USER_ID = 1
ANOTHER_USER_ID = 2

@pytest.mark.asyncio
async def test_post_message_unauthorized():
    app.dependency_overrides[get_current_user_id] = mock_get_current_user_id_no_token
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post(f"/api/{TEST_USER_ID}/chat", json={"message": "hello"})
    assert response.status_code == 401 # No token provided

@pytest.mark.asyncio
async def test_post_message_forbidden_user_id_mismatch():
    app.dependency_overrides[get_current_user_id] = mock_get_current_user_id_valid
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post(
            f"/api/{ANOTHER_USER_ID}/chat",
            json={"message": "hello"},
            headers={"Authorization": "Bearer some_token"} # Token is valid for TEST_USER_ID
        )
    assert response.status_code == 403 # Token for TEST_USER_ID, but trying to access ANOTHER_USER_ID's chat

@pytest.mark.asyncio
async def test_get_history_unauthorized():
    app.dependency_overrides[get_current_user_id] = mock_get_current_user_id_no_token
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get(f"/api/{TEST_USER_ID}/chat/1/history")
    assert response.status_code == 401 # No token provided

@pytest.mark.asyncio
async def test_get_history_forbidden_user_id_mismatch():
    app.dependency_overrides[get_current_user_id] = mock_get_current_user_id_valid
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get(
            f"/api/{ANOTHER_USER_ID}/chat/1/history",
            headers={"Authorization": "Bearer some_token"} # Token is valid for TEST_USER_ID
        )
    assert response.status_code == 403 # Token for TEST_USER_ID, but trying to access ANOTHER_USER_ID's history
