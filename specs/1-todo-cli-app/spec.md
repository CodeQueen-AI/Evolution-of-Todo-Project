# Feature Specification: Todo CLI App

**Feature Branch**: `1-todo-cli-app`  
**Created**: 2025-12-27  
**Status**: Draft  
**Input**: User description: `# Phase 1 Specification – Todo CLI App

## Overview
A command-line Todo application that allows users to manage tasks during runtime.

## Task Model
Each task contains:
- id (integer, auto-increment)
- title (string, required)
- description (string, optional)
- completed (boolean)

## Features

### 1. Add Task
- User can add a task with title and optional description.
- Title must not be empty.

### 2. View Tasks
- Display all tasks.
- Show task ID, title, and completion status.

### 3. Update Task
- User can update title and/or description using task ID.
- If task ID does not exist, show error.

### 4. Delete Task
- User can delete a task using task ID.
- Confirm deletion.

### 5. Mark Task Complete / Incomplete
- Toggle task completion using task ID.

## User Interface
- Menu-driven CLI
- Repeats until user chooses to exit
`

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add Task (Priority: P1)

User can add a new todo task to their list, providing a title and an optional description.

**Why this priority**: Core functionality of a todo application. Without adding tasks, other features are irrelevant.

**Independent Test**: Can be fully tested by attempting to add a task, then viewing the list to confirm its presence.

**Acceptance Scenarios**:

1. **Given** the application is running, **When** the user selects "Add Task" and provides a valid title "Buy groceries" and no description, **Then** a new task with ID 1, title "Buy groceries", empty description, and `completed` status false is added and displayed in the task list.
2. **Given** the application is running, **When** the user selects "Add Task" and provides a valid title "Read book" and description "Chapter 1-3", **Then** a new task with ID 2, title "Read book", description "Chapter 1-3", and `completed` status false is added and displayed in the task list.
3. **Given** the application is running, **When** the user selects "Add Task" and provides an empty title, **Then** an error message "Title cannot be empty" is displayed, and no task is added.

---

### User Story 2 - View Tasks (Priority: P1)

User can see a list of all their current todo tasks, including their ID, title, and completion status.

**Why this priority**: Essential for understanding current tasks and verifying other operations.

**Independent Test**: Can be fully tested by adding several tasks, then selecting "View Tasks" to confirm all tasks are displayed correctly.

**Acceptance Scenarios**:

1. **Given** the task list contains tasks "Buy groceries" (ID 1, incomplete) and "Read book" (ID 2, incomplete), **When** the user selects "View Tasks", **Then** the application displays both tasks with their respective IDs, titles, and completion statuses.
2. **Given** the task list is empty, **When** the user selects "View Tasks", **Then** the application displays a message indicating no tasks are present.

---

### User Story 3 - Update Task (Priority: P2)

User can modify the title and/or description of an existing task using its unique ID.

**Why this priority**: Allows for correction and refinement of tasks after creation.

**Independent Test**: Can be fully tested by adding a task, then attempting to update its title and/or description using its ID, and verifying the changes via "View Tasks".

**Acceptance Scenarios**:

1. **Given** the task list contains task "Buy groceries" (ID 1), **When** the user selects "Update Task", provides ID 1, and updates the title to "Buy fresh produce", **Then** the task with ID 1 now has the title "Buy fresh produce", and this change is reflected when viewing tasks.
2. **Given** the task list contains task "Read book" (ID 2), **When** the user selects "Update Task", provides ID 2, and updates the description to "Finish Chapter 3", **Then** the task with ID 2 now has the description "Finish Chapter 3", and this change is reflected when viewing tasks.
3. **Given** the task list contains no task with ID 99, **When** the user selects "Update Task", provides ID 99, and attempts to update, **Then** an error message "Task with ID 99 not found" is displayed, and no tasks are modified.

---

### User Story 4 - Delete Task (Priority: P2)

User can remove a task from their list using its unique ID, after confirming the deletion.

**Why this priority**: Essential for managing and cleaning up completed or obsolete tasks.

**Independent Test**: Can be fully tested by adding a task, then attempting to delete it and confirming the task is no longer in the list.

**Acceptance Scenarios**:

1. **Given** the task list contains task "Buy groceries" (ID 1), **When** the user selects "Delete Task", provides ID 1, and confirms deletion, **Then** the task with ID 1 is removed from the list, and this is reflected when viewing tasks.
2. **Given** the task list contains task "Read book" (ID 2), **When** the user selects "Delete Task", provides ID 2, but cancels deletion, **Then** the task with ID 2 remains in the list, and this is reflected when viewing tasks.
3. **Given** the task list contains no task with ID 99, **When** the user selects "Delete Task", provides ID 99, **Then** an error message "Task with ID 99 not found" is displayed, and no tasks are modified.

---

### User Story 5 - Mark Task Complete / Incomplete (Priority: P2)

User can toggle the completion status of a task (mark as complete or incomplete) using its unique ID.

**Why this priority**: Allows users to track progress and filter completed tasks.

**Independent Test**: Can be fully tested by adding a task, then toggling its completion status multiple times and verifying the status via "View Tasks".

**Acceptance Scenarios**:

1. **Given** the task list contains task "Buy groceries" (ID 1, incomplete), **When** the user selects "Mark Complete/Incomplete" and provides ID 1, **Then** the task with ID 1 is marked as complete, and this is reflected when viewing tasks.
2. **Given** the task list contains task "Read book" (ID 2, complete), **When** the user selects "Mark Complete/Incomplete" and provides ID 2, **Then** the task with ID 2 is marked as incomplete, and this is reflected when viewing tasks.
3. **Given** the task list contains no task with ID 99, **When** the user selects "Mark Complete/Incomplete", provides ID 99, **Then** an error message "Task with ID 99 not found" is displayed, and no tasks are modified.

### Edge Cases

- What happens when an empty title is provided during task addition? The system should display an error and not create the task.
- How does the system handle a non-integer or negative task ID for update, delete, or toggle operations? The system should display an error for invalid input.
- How does the system behave if the user attempts to delete/update/toggle a task that does not exist? The system should display an appropriate "Task not found" error message.
- What happens if the user provides incomplete input (e.g., only title, no description when updating) when an optional field is allowed to be empty? The system should handle partial updates correctly, retaining existing values for unspecified optional fields.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow user to add a task with a title and optional description.
- **FR-002**: System MUST ensure task title is not empty upon creation.
- **FR-003**: System MUST display all tasks including ID, title, and completion status.
- **FR-004**: System MUST allow user to update task title and/or description using task ID.
- **FR-005**: System MUST inform user if a provided task ID for update does not exist.
- **FR-006**: System MUST allow user to delete a task using task ID.
- **FR-007**: System MUST confirm deletion with the user before proceeding.
- **FR-008**: System MUST inform user if a provided task ID for deletion does not exist.
- **FR-009**: System MUST allow user to toggle task completion status using task ID.
- **FR-010**: System MUST inform user if a provided task ID for toggling completion does not exist.
- **FR-011**: System MUST present a menu-driven CLI for user interaction.
- **FR-012**: System MUST repeat the menu until the user chooses to exit.
- **FR-013**: Each task MUST have a unique auto-incrementing integer ID, starting from 1.

### Key Entities *(include if feature involves data)*

- **Task**: Represents a single todo item.
    - `id`: integer, unique, auto-incrementing
    - `title`: string, required, cannot be empty
    - `description`: string, optional
    - `completed`: boolean, defaults to `false`

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully perform all 5 core task management operations (add, view, update, delete, toggle completion) without encountering application crashes.
- **SC-002**: Invalid user inputs for task IDs or titles (e.g., empty title, non-existent ID, non-integer ID) are met with clear, user-friendly error messages in 100% of cases.
- **SC-003**: The CLI menu system allows users to navigate all features and exit the application cleanly and intuitively, reflected by zero reported issues during testing.
- **SC-004**: Task data integrity is maintained across all operations; tasks are correctly added, updated, deleted, and marked complete/incomplete as per user actions.
