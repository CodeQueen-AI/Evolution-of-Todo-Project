from typing import List, Optional, Annotated
from fastapi import APIRouter, Depends, status, HTTPException, Path, Query
from pydantic import BaseModel, Field
from datetime import datetime # Added for TaskResponse
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.services.task_service import TaskService
from src.middleware.auth import get_current_user, verify_user_ownership
from src.models.task import Task # For return type hinting

router = APIRouter()

# Pydantic models for request/response
class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    user_id: str
    completed: bool = False
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

@router.post(
    "/{user_id}/tasks",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new task for the user",
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
        status.HTTP_403_FORBIDDEN: {"description": "Forbidden"}
    }
)
async def create_task_endpoint(
    user_id: Annotated[str, Path(description="The ID of the user")],
    task_data: TaskCreate,
    current_user_id: Annotated[str, Depends(verify_user_ownership)], # This already checks user_id == current_user_id
    db: Annotated[AsyncSession, Depends(get_db)]
):
    task_service = TaskService(db)
    new_task = await task_service.create_task(
        user_id=current_user_id, # Use current_user_id from token to ensure ownership
        title=task_data.title,
        description=task_data.description
    )
    return new_task


@router.get(
    "/{user_id}/tasks",
    response_model=List[TaskResponse],
    summary="List all tasks for the user",
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
        status.HTTP_403_FORBIDDEN: {"description": "Forbidden"}
    }
)
async def list_tasks_endpoint(
    user_id: Annotated[str, Path(description="The ID of the user")],
    current_user_id: Annotated[str, Depends(verify_user_ownership)],
    db: Annotated[AsyncSession, Depends(get_db)],
    completed: Annotated[Optional[bool], Query(description="Filter tasks by completion status")] = None,
    sort_by: Annotated[str, Query(description="Sort tasks by field", enum=["created_at", "updated_at", "title"])] = "created_at",
    order: Annotated[str, Query(description="Sort order", enum=["asc", "desc"])] = "asc",
):
    task_service = TaskService(db)
    tasks = await task_service.get_tasks(
        user_id=current_user_id,
        completed=completed,
        sort_by=sort_by,
        order=order
    )
    return tasks

