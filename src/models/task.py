from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Task:
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False

    def __post_init__(self):
        if not self.title:
            raise ValueError("Task title cannot be empty.")
