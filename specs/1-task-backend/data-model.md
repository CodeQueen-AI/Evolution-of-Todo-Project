# Data Model: Todo App Backend - Phase II

**Feature Branch**: `1-task-backend`
**Created**: 2026-01-08

## Entities

### Task

Represents a single to-do item belonging to a user.

- **id**: Integer (Primary Key)
  - _Description_: Unique identifier for the task.
- **user_id**: String (Foreign Key to User.id)
  - _Description_: Identifier of the user who owns this task.
  - _Validation_: Must reference an existing user.
- **title**: String
  - _Description_: A brief summary of the task.
  - _Validation_: Required, length between 1 and 200 characters.
- **description**: String (Optional)
  - _Description_: Detailed explanation of the task.
  - _Validation_: Maximum length of 1000 characters.
- **completed**: Boolean
  - _Description_: Status of the task (true if completed, false if pending).
  - _Default_: `false`
- **created_at**: Timestamp
  - _Description_: The date and time when the task was created.
  - _Auto-generated_: Automatically set upon creation.
- **updated_at**: Timestamp
  - _Description_: The date and time when the task was last updated.
  - _Auto-generated_: Automatically updated on modifications.

#### Relationships:
- **Task** `belongs to` **User** (via `user_id`)

### User (Implicit)

While not a core entity managed by this backend, the existence of a `User` entity is implied for task ownership and authentication.

- **id**: String (Primary Key)
  - _Description_: Unique identifier for the user. Used as a foreign key in the Task entity.
  - _Note_: User management (creation, authentication) is assumed to be handled externally.

## Validation Rules

- **Task Title**: Must be between 1 and 200 characters.
- **Task Description**: Maximum 1000 characters.
- **JWT Token**: Required for all authenticated operations.
  - _Expiration_: Tokens expire in 7 days.

## Data Storage

All data will be stored persistently in a PostgreSQL database (Neon Serverless).

### Indexes

- `tasks.user_id`: To efficiently filter tasks by user.
- `tasks.completed`: To efficiently filter tasks by completion status.
