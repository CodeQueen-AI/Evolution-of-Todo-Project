import pytest
from src.models.task import Task
from src.services.task_repository import TaskRepository
from src.services.task_service import TaskService

@pytest.fixture
def task_repo():
    repo = TaskRepository()
    repo.clear() # Ensure a clean state for each test
    return repo

def test_add_task_success(task_repo):
    service = TaskService(task_repo)
    task = service.add_task("Buy groceries", "Milk, eggs")
    assert task.id == 1
    assert task.title == "Buy groceries"
    assert task.description == "Milk, eggs"
    assert not task.completed

    tasks = task_repo.get_all()
    assert len(tasks) == 1
    assert tasks[0] == task

def test_add_task_empty_title_raises_error(task_repo):
    service = TaskService(task_repo)
    with pytest.raises(ValueError, match="Title cannot be empty."):
        service.add_task("", "Description")
    assert len(task_repo.get_all()) == 0

def test_get_all_tasks_empty(task_repo):
    service = TaskService(task_repo)
    tasks = service.get_all_tasks()
    assert tasks == []

def test_get_all_tasks_with_tasks(task_repo):
    service = TaskService(task_repo)
    service.add_task("Task 1")
    service.add_task("Task 2", "Description 2")
    tasks = service.get_all_tasks()
    assert len(tasks) == 2
    assert tasks[0].title == "Task 1"
    assert tasks[1].title == "Task 2"

def test_update_task_success_title_and_description(task_repo):
    service = TaskService(task_repo)
    initial_task = service.add_task("Old Title", "Old Description")
    
    updated_task = service.update_task(initial_task.id, "New Title", "New Description")
    assert updated_task is not None
    assert updated_task.id == initial_task.id
    assert updated_task.title == "New Title"
    assert updated_task.description == "New Description"
    assert service.get_all_tasks()[0] == updated_task

def test_update_task_success_only_title(task_repo):
    service = TaskService(task_repo)
    initial_task = service.add_task("Old Title", "Old Description")
    
    updated_task = service.update_task(initial_task.id, "New Title", None)
    assert updated_task is not None
    assert updated_task.id == initial_task.id
    assert updated_task.title == "New Title"
    assert updated_task.description is None # Explicitly set to None
    assert service.get_all_tasks()[0] == updated_task

def test_update_task_success_only_description(task_repo):
    service = TaskService(task_repo)
    initial_task = service.add_task("Old Title", "Old Description")
    
    updated_task = service.update_task(initial_task.id, None, "New Description")
    assert updated_task is not None
    assert updated_task.id == initial_task.id
    assert updated_task.title == "Old Title" # Should remain old title
    assert updated_task.description == "New Description"
    assert service.get_all_tasks()[0] == updated_task

def test_update_task_not_found(task_repo):
    service = TaskService(task_repo)
    service.add_task("Existing Task")
    
    updated_task = service.update_task(99, "Non Existent", "Desc")
    assert updated_task is None
    assert len(service.get_all_tasks()) == 1 # No change to existing tasks

def test_update_task_empty_title_raises_error(task_repo):
    service = TaskService(task_repo)
    initial_task = service.add_task("Valid Title")
    
    with pytest.raises(ValueError, match="Title cannot be empty."):
        service.update_task(initial_task.id, "", "New Desc")
    
    # Verify task was not updated
    retrieved_task = service.get_all_tasks()[0]
    assert retrieved_task.title == "Valid Title"

def test_delete_task_success(task_repo):
    service = TaskService(task_repo)
    task1 = service.add_task("Task 1")
    task2 = service.add_task("Task 2")

    deleted = service.delete_task(task1.id)
    assert deleted
    assert service.get_all_tasks() == [task2]

def test_delete_task_not_found(task_repo):
    service = TaskService(task_repo)
    service.add_task("Task 1")

    deleted = service.delete_task(99)
    assert not deleted
    assert len(service.get_all_tasks()) == 1

def test_toggle_task_completion_to_complete(task_repo):
    service = TaskService(task_repo)
    task = service.add_task("Test Task")
    assert not task.completed

    toggled_task = service.toggle_task_completion(task.id)
    assert toggled_task is not None
    assert toggled_task.completed

    retrieved_task = service.repository.get_by_id(task.id)
    assert retrieved_task.completed

def test_toggle_task_completion_to_incomplete(task_repo):
    service = TaskService(task_repo)
    task = service.add_task("Test Task")
    task.completed = True # Manually set to completed for initial state
    service.repository.update(task) # Update in repo

    assert service.repository.get_by_id(task.id).completed

    toggled_task = service.toggle_task_completion(task.id)
    assert toggled_task is not None
    assert not toggled_task.completed

    retrieved_task = service.repository.get_by_id(task.id)
    assert not retrieved_task.completed

def test_toggle_task_completion_not_found(task_repo):
    service = TaskService(task_repo)
    service.add_task("Existing Task")

    toggled_task = service.toggle_task_completion(99)
    assert toggled_task is None
    assert len(service.get_all_tasks()) == 1

