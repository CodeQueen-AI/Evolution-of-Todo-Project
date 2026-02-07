from typing import List, Optional
# from backend.models.task import Task
from models.task import Task
class TaskRepository:
    _instance = None
    _tasks: List[Task]
    _next_id: int

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(TaskRepository, cls).__new__(cls)
            cls._instance._tasks = []
            cls._instance._next_id = 1
        return cls._instance

    def add(self, task: Task) -> Task:
        task.id = self._next_id
        self._next_id += 1
        self._tasks.append(task)
        return task

    def get_all(self) -> List[Task]:
        return list(self._tasks) # Return a copy to prevent external modification

    def get_by_id(self, task_id: int) -> Optional[Task]:
        return next((task for task in self._tasks if task.id == task_id), None)

    def update(self, updated_task: Task) -> Optional[Task]:
        for i, task in enumerate(self._tasks):
            if task.id == updated_task.id:
                self._tasks[i] = updated_task
                return updated_task
        return None

    def delete(self, task_id: int) -> bool:
        initial_len = len(self._tasks)
        self._tasks = [task for task in self._tasks if task.id != task_id]
        return len(self._tasks) < initial_len

    def clear(self): # For testing purposes
        self._tasks = []
        self._next_id = 1
