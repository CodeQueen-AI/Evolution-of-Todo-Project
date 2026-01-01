# Quickstart Guide: Todo CLI App

**Date**: 2025-12-27
**Feature**: Todo CLI App
**Spec**: specs/1-todo-cli-app/spec.md
**Plan**: specs/1-todo-cli-app/plan.md


## Overview

This document provides a quick guide to understanding and using the Todo CLI App, a command-line application for managing personal tasks.

## Key Features

The Todo CLI App allows you to:
- Add new tasks with a title and optional description.
- View all existing tasks, including their unique ID, title, and completion status.
- Update the title and/or description of any task using its ID.
- Delete tasks by ID, with a confirmation step.
- Mark tasks as complete or incomplete by toggling their status.

## Usage (Conceptual)

While the application is under development, the intended usage flow will be:

1.  **Run the application**: Execute the main Python script from your terminal.
2.  **Navigate the menu**: The application will present a menu of options (e.g., "Add Task", "View Tasks", "Update Task", "Delete Task", "Toggle Completion", "Exit").
3.  **Perform actions**: Enter the corresponding number or command for your desired action.
4.  **Follow prompts**: The application will guide you through necessary inputs (e.g., task title, ID).
5.  **Exit**: Choose the "Exit" option to close the application.

## Example Flow

```
$ python todo_app.py

Welcome to the Todo CLI App!
Please choose an option:
1. Add Task
2. View Tasks
3. Update Task
4. Delete Task
5. Toggle Completion
6. Exit

Enter your choice: 1
Enter task title (required): Buy groceries
Enter task description (optional): Milk, eggs, bread

Task "Buy groceries" added!

Enter your choice: 2

Tasks:
ID: 1, Title: Buy groceries, Description: Milk, eggs, bread, Completed: No

Enter your choice: 5
Enter task ID to toggle: 1

Task ID 1 marked as complete!

Enter your choice: 2

Tasks:
ID: 1, Title: Buy groceries, Description: Milk, eggs, bread, Completed: Yes

Enter your choice: 6
Exiting Todo CLI App. Goodbye!
```

---
**Note**: This is a conceptual guide. Actual commands and output may vary in the final implementation.
