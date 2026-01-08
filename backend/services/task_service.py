from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, asc, desc
# from backend.models.task import Task
from models.task import Task
class TaskService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_task(self, user_id: str, title: str, description: Optional[str] = None) -> Task:
        new_task = Task(user_id=user_id, title=title, description=description)
        self.db.add(new_task)
        await self.db.commit()
        await self.db.refresh(new_task)
        return new_task

    async def get_tasks(self, user_id: str, completed: Optional[bool] = None,
                        sort_by: str = "created_at", order: str = "asc") -> List[Task]:
        query = select(Task).filter(Task.user_id == user_id)

        if completed is not None:
            query = query.filter(Task.completed == completed)

        if sort_by == "created_at":
            query = query.order_by(asc(Task.created_at) if order == "asc" else desc(Task.created_at))
        elif sort_by == "updated_at":
            query = query = query.order_by(asc(Task.updated_at) if order == "asc" else desc(Task.updated_at))
        elif sort_by == "title":
            query = query.order_by(asc(Task.title) if order == "asc" else desc(Task.title))
        
        result = await self.db.execute(query)
        return result.scalars().all()

    async def get_task_by_id(self, task_id: int, user_id: str) -> Optional[Task]:
        query = select(Task).filter(and_(Task.id == task_id, Task.user_id == user_id))
        result = await self.db.execute(query)
        return result.scalars().first()

    async def update_task(self, task: Task, title: Optional[str] = None, description: Optional[str] = None) -> Task:
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        await self.db.commit()
        await self.db.refresh(task)
        return task

    async def delete_task(self, task: Task):
        await self.db.delete(task)
        await self.db.commit()

    async def toggle_task_completion(self, task: Task) -> Task:
        task.completed = not task.completed
        await self.db.commit()
        await self.db.refresh(task)
        return task