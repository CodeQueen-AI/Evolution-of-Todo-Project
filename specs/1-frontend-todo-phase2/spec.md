# Feature Specification: Frontend Todo App - Phase II

**Feature Branch**: `1-frontend-todo-phase2`  
**Created**: 2026-01-09  
**Status**: Draft  
**Input**: User description: "read the specification.txt file all requirements have in the specification.txt file"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - User Authentication (Priority: P1)

A new user visits the site, signs up for an account, and is automatically logged in. An existing user visits the site and logs in. After login, they are directed to their tasks page. A logged-in user can also log out.

**Why this priority**: Core functionality; no other actions can be taken without authentication.

**Independent Test**: Can be tested by creating a user, logging in, viewing the protected tasks page, and logging out. This delivers the foundational value of a secure, personal workspace.

**Acceptance Scenarios**:

1. **Given** a user is not logged in, **When** they navigate to `/signup` and submit valid credentials, **Then** an account is created and they are redirected to `/tasks`.
2. **Given** a user with an existing account is not logged in, **When** they navigate to `/signin` and submit valid credentials, **Then** they are logged in and redirected to `/tasks`.
3. **Given** a user is logged in, **When** they click the logout button, **Then** they are logged out and can no longer access the `/tasks` page.

---

### User Story 2 - Task Management (Priority: P2)

An authenticated user views their list of tasks. They can add a new task, view a single task's details, edit that task's title/description, toggle its completion status, and delete it.

**Why this priority**: This is the primary purpose of the application for an authenticated user.

**Independent Test**: Can be tested by a logged-in user performing all CRUD (Create, Read, Update, Delete) operations on their tasks.

**Acceptance Scenarios**:

1. **Given** a user is logged in on the `/tasks` page, **When** they submit a new task in the `TaskForm`, **Then** the new task appears in the `TaskList`.
2. **Given** a user is viewing their `TaskList`, **When** they click on a `TaskCard`, **Then** they are navigated to `/tasks/[id]` and see the task's details.
3. **Given** a user is on the `/tasks/[id]` page, **When** they edit the task's details and save, **Then** the updated information is displayed.
4. **Given** a user is viewing a task, **When** they use the `CompleteToggle`, **Then** the task's status is visually updated on both the list and detail pages.
5. **Given** a user is on the `/tasks/[id]` page, **When** they delete the task, **Then** it is removed from their `TaskList`.

---

### User Story 3 - Task Filtering & Sorting (Priority: P3)

An authenticated user on the `/tasks` page can filter their tasks to show all, only pending, or only completed tasks. They can also sort the tasks.

**Why this priority**: Enhances usability for users with many tasks.

**Independent Test**: A logged-in user with a list of mixed-status tasks can successfully filter and sort them, and the list updates accordingly.

**Acceptance Scenarios**:

1. **Given** a user has multiple tasks with different statuses, **When** they select the "Completed" filter, **Then** only tasks marked as complete are shown.
2. **Given** a user is viewing a filtered list, **When** they change the sort order, **Then** the list re-orders according to the selected criteria.

---

### Edge Cases

- **Unauthorized Access**: If a non-authenticated user attempts to access `/tasks` or `/tasks/[id]`, they should be redirected to the `/signin` page.
- **Resource Ownership**: If a user attempts to access a task they do not own via URL (`/tasks/[some-else-task-id]`), the system should display a "Not Found" or "Access Denied" error and not leak any task information.
- **API Failures**: If a backend API call fails (e.g., server error, network issue), the UI should display a user-friendly error message (e.g., "Failed to load tasks. Please try again.") instead of crashing.
- **Empty State**: When a new user logs in and has no tasks, the `TaskList` area should display a message like "You have no tasks yet. Add one above!"

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a signup page at `/signup` using the Better Auth form.
- **FR-002**: System MUST provide a signin page at `/signin` using the Better Auth form.
- **FR-003**: System MUST redirect users to `/tasks` after successful signup or signin.
- **FR-004**: System MUST protect the `/tasks` and `/tasks/[id]` routes, making them accessible only to authenticated users via `AuthGuard`.
- **FR-005**: The `/tasks` page MUST display a `TaskList` and a `TaskForm`.
- **FR-006**: Users MUST be able to filter tasks by their completion status (all, completed, pending).
- **FR-007**: Users MUST be able to sort tasks by creation date (newest/oldest), description (alphabetical A-Z/Z-A), and status (completed/pending).
- **FR-008**: The `/tasks/[id]` page MUST display the details of a single task in a `TaskCard`.
- **FR-009**: Users MUST be able to edit a task's title and description from the task detail page.
- **FR-010**: Users MUST be able to delete a task.
- **FR-011**: Users MUST be able to toggle a task's completion status.
- **FR-012**: The `Navbar` MUST display user information from Better Auth and a logout button.
- **FR-013**: All API requests for task data MUST include the JWT token from Better Auth in the `Authorization` header.
- **FR-014**: The UI MUST provide visual feedback for loading states, successes, and errors.
- **FR-015**: Forms and buttons MUST have distinct hover and focus effects.
- **FR-016**: `TaskCard` components MUST have a visually distinct style for completed vs. pending tasks.
- **FR-017**: All form inputs MUST be validated before submission.

### Architectural Considerations (Aligned with Project Constitution)

- **Modularity**: The application will be built with Next.js 16+ App Router, TypeScript, and Tailwind CSS. Components (`TaskCard`, `TaskList`, `AuthGuard`, etc.) will be self-contained and reusable.
- **Testability**: All functional requirements are defined to be verifiable. For example, `FR-004` can be tested by attempting to access a protected route without a valid JWT.
- **Maintainability**: Code will adhere to standard React/Next.js patterns. TypeScript will be used to ensure type safety.

### Key Entities *(include if feature involves data)*

- **User**: Represents the authenticated user, managed externally by Better Auth. Key attributes: name, email.
- **Task**: Represents a to-do item. Key attributes: id, title, description, status (completed/pending), created_date, updated_date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of task-related pages (`/tasks`, `/tasks/[id]`) are inaccessible to unauthenticated users, redirecting them to `/signin`.
- **SC-002**: A user can perform any core task operation (create, view, update, delete) with the UI updating in under 3 seconds.
- **SC-003**: The primary task list on the `/tasks` page loads and displays up to 100 tasks in under 1.5 seconds.
- **SC-004**: Form validation errors are displayed to the user in-line within 500ms of a failed submission attempt.
