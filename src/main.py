from src.services.task_repository import TaskRepository
from src.services.task_service import TaskService
from src.cli.commands import add_task_command, view_tasks_command, update_task_command, delete_task_command, toggle_completion_command

def main():
    print("Welcome to the Todo CLI App!")
    repository = TaskRepository()
    service = TaskService(repository)

    while True:
        print("\nMenu:")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Update Task")
        print("4. Delete Task")
        print("5. Toggle Completion")
        print("6. Exit")

        choice = input("Enter your choice: ").strip()

        if choice == '1':
            add_task_command(service)
        elif choice == '2':
            view_tasks_command(service)
        elif choice == '3':
            update_task_command(service)
        elif choice == '4':
            delete_task_command(service)
        elif choice == '5':
            toggle_completion_command(service)
        elif choice == '6':
            print("Exiting Todo CLI App. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
