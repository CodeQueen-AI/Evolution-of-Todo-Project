from typing import Optional, List
from services.task_service import TaskService
from services.task_repository import TaskRepository 
from models.task import Task 
from cli.error_handler import handle_error, get_int_input

def add_task_command(task_service: TaskService):
    title = input("Enter task title (required): ").strip()
    description = input("Enter task description (optional): ").strip()

    if not description:
        description = None

    try:
        new_task = task_service.add_task(title, description)
        print(f"Task '{new_task.title}' (ID: {new_task.id}) added!")
    except ValueError as e:
        print(f"Error: {e}")

def view_tasks_command(task_service: TaskService):
    tasks: List[Task] = task_service.get_all_tasks()

    if not tasks:
        print("No tasks found.")
        return

    print("\n--- Your Tasks ---")
    for task in tasks:
        status = "✅" if task.completed else "☐"
        desc = f" ({task.description})" if task.description else ""
        print(f"ID: {task.id} | {status} {task.title}{desc}")
    print("------------------\n")

def update_task_command(task_service: TaskService):
    task_id = get_int_input("Enter the ID of the task to update: ")
    if task_id is None: 
        return

    print("Enter new title (leave blank to keep current):")
    new_title = input().strip()
    new_title = new_title if new_title else None

    print("Enter new description (leave blank to keep current, type 'none' to clear):")
    new_description_input = input().strip()
    if new_description_input == 'none':
        new_description = None
    elif new_description_input:
        new_description = new_description_input
    else:
        new_description = None

    try:
        updated_task = task_service.update_task(task_id, new_title, new_description)
        if updated_task:
            print(f"Task ID {task_id} updated successfully!")
        else:
            print(f"Error: Task with ID {task_id} not found.")
    except ValueError as e:
        handle_error(e, f"Failed to update task ID {task_id}.")

def delete_task_command(task_service: TaskService):
    task_id = get_int_input("Enter the ID of the task to delete: ")
    if task_id is None:
        return
    
    task_to_delete = task_service.repository.get_by_id(task_id) 
    if not task_to_delete:
        print(f"Error: Task with ID {task_id} not found.")
        return

    confirm = input(f"Are you sure you want to delete task '{task_to_delete.title}' (ID: {task_id})? (yes/no): ").strip().lower()
    if confirm == 'yes':
        try:
            if task_service.delete_task(task_id):
                print(f"Task ID {task_id} deleted successfully!")
            else:
                print(f"Error: Task with ID {task_id} not found (unexpected).") 
        except Exception as e:
            handle_error(e, f"Failed to delete task ID {task_id}.")
    else:
        print(f"Deletion of task ID {task_id} cancelled.")

def toggle_completion_command(task_service: TaskService):
    task_id = get_int_input("Enter the ID of the task to toggle completion: ")
    if task_id is None:
        return
    try:
        toggled_task = task_service.toggle_task_completion(task_id)
        if toggled_task:
            status = "completed" if toggled_task.completed else "incomplete"
            print(f"Task '{toggled_task.title}' (ID: {toggled_task.id}) marked as {status}.")
        else:
            print(f"Error: Task with ID {task_id} not found.")
    except Exception as e:
        handle_error(e, f"Failed to toggle completion for task ID {task_id}.")
