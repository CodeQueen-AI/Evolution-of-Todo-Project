from typing import List, Optional, Annotated
from fastapi import APIRouter, Depends, status, HTTPException, Path, Query
from pydantic import BaseModel, Field
from datetime import datetime 
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from services.task_service import TaskService
from middleware.auth import get_current_user, verify_user_ownership
from models.task import Task 

router = APIRouter()

# Pydantic models for request/response
class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
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


@router.get(
    "/{user_id}/tasks/{task_id}",
    response_model=TaskResponse,
    summary="Get details of a specific task by ID",
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
        status.HTTP_403_FORBIDDEN: {"description": "Forbidden"},
        status.HTTP_404_NOT_FOUND: {"description": "Task not found"}
    }
)
async def get_task_by_id_endpoint(
    user_id: Annotated[str, Path(description="The ID of the user")],
    task_id: Annotated[int, Path(description="The ID of the task")],
    current_user_id: Annotated[str, Depends(verify_user_ownership)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    task_service = TaskService(db)
    task = await task_service.get_task_by_id(task_id, current_user_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.put(
    "/{user_id}/tasks/{task_id}",
    response_model=TaskResponse,
    summary="Update an existing task",
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
        status.HTTP_403_FORBIDDEN: {"description": "Forbidden"},
        status.HTTP_404_NOT_FOUND: {"description": "Task not found"}
    }
)
async def update_task_endpoint(
    user_id: Annotated[str, Path(description="The ID of the user")],
    task_id: Annotated[int, Path(description="The ID of the task to update")],
    task_data: TaskUpdate,
    current_user_id: Annotated[str, Depends(verify_user_ownership)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    task_service = TaskService(db)
    task = await task_service.get_task_by_id(task_id, current_user_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    updated_task = await task_service.update_task(
        task=task,
        title=task_data.title,
        description=task_data.description
    )
    return updated_task


@router.delete(
    "/{user_id}/tasks/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a task",
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
        status.HTTP_403_FORBIDDEN: {"description": "Forbidden"},
        status.HTTP_404_NOT_FOUND: {"description": "Task not found"}
    }
)
async def delete_task_endpoint(
    user_id: Annotated[str, Path(description="The ID of the user")],
    task_id: Annotated[int, Path(description="The ID of the task to delete")],
    current_user_id: Annotated[str, Depends(verify_user_ownership)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    task_service = TaskService(db)
    task = await task_service.get_task_by_id(task_id, current_user_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    await task_service.delete_task(task)
    return {}


@router.patch(
    "/{user_id}/tasks/{task_id}/complete",
    response_model=TaskResponse,
    summary="Toggle task completion status",
    responses={
        status.HTTP_401_UNAUTHORIZED: {"description": "Unauthorized"},
        status.HTTP_403_FORBIDDEN: {"description": "Forbidden"},
        status.HTTP_404_NOT_FOUND: {"description": "Task not found"}
    }
)
async def toggle_task_completion_endpoint(
    user_id: Annotated[str, Path(description="The ID of the user")],
    task_id: Annotated[int, Path(description="The ID of the task to toggle completion")],
    current_user_id: Annotated[str, Depends(verify_user_ownership)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    task_service = TaskService(db)
    task = await task_service.get_task_by_id(task_id, current_user_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    
    toggled_task = await task_service.toggle_task_completion(task)
    return toggled_task


