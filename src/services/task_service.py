from typing import Optional
from src.models.task import Task
from src.services.task_repository import TaskRepository

class TaskService:
    def __init__(self, repository: TaskRepository):
        self.repository = repository

    def add_task(self, title: str, description: Optional[str] = None) -> Task:
        if not title:
            raise ValueError("Title cannot be empty.")
        new_task = Task(id=0, title=title, description=description) # id will be set by repository
        return self.repository.add(new_task)

    def get_all_tasks(self) -> List[Task]:
        return self.repository.get_all()


    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Optional[Task]:
        task = self.repository.get_by_id(task_id)
        if not task:
            return None

        if title is not None:
            if not title:
                raise ValueError("Title cannot be empty.")
            task.title = title
        
        if description is not None:
            task.description = description
        
        # If title and description are both None, it means no update was requested for these fields.
        # But we still need to call repository.update to ensure the object in the repo is the same.
        # If no changes were made, repository.update will simply re-store the same object.

        return self.repository.update(task)

    def delete_task(self, task_id: int) -> bool:
        return self.repository.delete(task_id)

    def toggle_task_completion(self, task_id: int) -> Optional[Task]:
        task = self.repository.get_by_id(task_id)
        if not task:
            return None
        
        task.completed = not task.completed
        return self.repository.update(task)
