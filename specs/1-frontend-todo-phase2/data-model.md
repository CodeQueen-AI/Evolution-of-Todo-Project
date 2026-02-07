# Data Models: Frontend Todo App

This document defines the data structures used by the frontend application.

## 1. Task

Represents a single to-do item.

-   **id**: `number` (e.g., `123`)
    -   Description: The unique identifier for the task.
    -   Validation: Required, integer.
-   **title**: `string` (e.g., `"Buy milk"`)
    -   Description: The main title or description of the task.
    -   Validation: Required, non-empty string, max 255 characters.
-   **description**: `string` (e.g., `"Get 2% milk from the store"`)
    -   Description: A more detailed description of the task.
    -   Validation: Optional, string.
-   **completed**: `boolean` (e.g., `false`)
    -   Description: The completion status of the task.
    -   Validation: Required, boolean.
-   **created_at**: `string` (e.g., `"2026-01-09T10:00:00Z"`)
    -   Description: The ISO 8601 timestamp when the task was created.
    -   Validation: Required, valid ISO 8601 date-time format.
-   **updated_at**: `string` (e.g., `"2026-01-09T10:00:00Z"`)
    -   Description: The ISO 8601 timestamp when the task was last updated.
    -   Validation: Required, valid ISO 8601 date-time format.

## 2. User

Represents the authenticated user. This data is provided by the authentication service.

-   **name**: `string` (e.g., `"Jane Doe"`)
    -   Description: The user's full name.
-   **email**: `string` (e.g., `"jane.doe@example.com"`)
    -   Description: The user's email address.
