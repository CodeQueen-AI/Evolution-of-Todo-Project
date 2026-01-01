# Data Model: Todo CLI App

**Date**: 2025-12-27
**Spec**: specs/1-todo-cli-app/spec.md
**Plan**: specs/1-todo-cli-app/plan.md

## Entities

### Task

Represents a single todo item managed by the application.

- **Attributes**:
    - `id`:
        - **Type**: Integer
        - **Description**: Unique identifier for the task.
        - **Constraints**: Auto-incrementing, unique, positive.
    - `title`:
        - **Type**: String
        - **Description**: A brief, descriptive name for the task.
        - **Constraints**: Required, cannot be empty.
    - `description`:
        - **Type**: String
        - **Description**: Optional longer explanation or details about the task.
        - **Constraints**: Optional, can be empty.
    - `completed`:
        - **Type**: Boolean
        - **Description**: Indicates whether the task has been completed.
        - **Constraints**: Defaults to `false` (incomplete) upon creation.

## Relationships

- No explicit relationships between entities in this single-entity model.

## State Transitions (for Task)

- **Initial State**: `completed = false` (upon creation).
- **Transition**: `completed = true` (when marked as complete).
- **Transition**: `completed = false` (when marked as incomplete).
