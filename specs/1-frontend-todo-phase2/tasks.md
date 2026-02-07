# Tasks: Frontend Todo App - Phase II

**Input**: Design documents from `specs/1-frontend-todo-phase2/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create the Next.js project structure and configuration for the new `frontend` application.

- [x] T001 Create the root `frontend` directory for the new application.
- [x] T002 [P] Create the main project configuration file `frontend/package.json` with all required dependencies (Next.js, React, Tailwind CSS, SWR, etc.).
- [x] T003 [P] Create the Next.js configuration file `frontend/next.config.js`.
- [x] T004 [P] Create the TypeScript configuration file `frontend/tsconfig.json`.
- [x] T005 [P] Create the Tailwind CSS configuration file `frontend/tailwind.config.ts`.
- [x] T006 [P] Create the PostCSS configuration file `frontend/postcss.config.js` for Tailwind CSS.
- [x] T007 **[USER ACTION]** Run `npm install` within the `frontend` directory to install all dependencies defined in `package.json`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the core infrastructure, styling, and services that all user stories will depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T008 Create the initial source directory structure: `frontend/src/app`, `frontend/src/components`, `frontend/src/services`, `frontend/src/hooks`, and `frontend/src/lib`.
- [x] T009 [P] Create the global stylesheet `frontend/src/app/globals.css` and include Tailwind CSS base styles.
- [x] T010 Create the root layout component `frontend/src/app/layout.tsx` with the main HTML document structure.
- [x] T011 [P] Define application-wide TypeScript types for 'Task' and 'User' in `frontend/src/lib/types.ts` based on the data model.
- [x] T012 [P] Implement a basic API service wrapper in `frontend/src/services/api.ts` to handle `fetch` requests to the backend.
- [x] T013 Implement authentication route protection in `frontend/src/middleware.ts`.
- [x] T014 Set up a shared authentication context provider in `frontend/src/hooks/useAuth.ts` to manage and distribute user auth state.

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable users to sign up, sign in, and log out of the application.
**Independent Test**: A user can create an account, log out, and log back in. Protected pages are inaccessible after logout.

- [x] T015 [P] [US1] Create the sign-in page component at `frontend/src/app/(auth)/signin/page.tsx`.
- [x] T016 [P] [US1] Create the sign-up page component at `frontend/src/app/(auth)/signup/page.tsx`.
- [x] T017 [P] [US1] Create a reusable `Button` component in `frontend/src/components/ui/Button.tsx`.
- [x] T018 [P] [US1] Create a reusable `Input` component in `frontend/src/components/ui/Input.tsx`.
- [x] T019 [US1] Implement the `Navbar` component in `frontend/src/components/layout/Navbar.tsx` to display user info and a logout button.
- [x] T020 [US1] Implement the authentication logic in `frontend/src/services/auth.ts` for login, signup, and logout API calls.
- [x] T021 [US1] Integrate the `auth.ts` service with the sign-in, sign-up, and logout components.

---

## Phase 4: User Story 2 - Task Management (Priority: P2)

**Goal**: Allow authenticated users to create, read, update, and delete their tasks.
**Independent Test**: A logged-in user can add a task, see it in their list, edit its content, mark it complete, and delete it.

- [x] T022 [P] [US2] Create the `TaskCard` component in `frontend/src/components/tasks/TaskCard.tsx` to display a single task.
- [x] T023 [P] [US2] Create the `TaskForm` component in `frontend/src/components/tasks/TaskForm.tsx` for creating and editing tasks.
- [x] T024 [P] [US2] Create the `CompleteToggle` component in `frontend/src/components/tasks/CompleteToggle.tsx` to change a task's status.
- [x] T025 [US2] Create the `TaskList` component in `frontend/src/components/tasks/TaskList.tsx` to fetch and display a list of tasks using SWR.
- [x] T026 [US2] Implement the main tasks page at `frontend/src/app/tasks/page.tsx`.
- [x] T027 [US2] Implement the single task detail page at `frontend/src/app/tasks/[id]/page.tsx`.
- [x] T028 [US2] Add task-related CRUD functions to the API service in `frontend/src/services/api.ts`.

---

## Phase 5: User Story 3 - Filtering & Sorting (Priority: P3)

**Goal**: Enable users to filter and sort their task list for better organization.
**Independent Test**: A logged-in user with multiple tasks can use UI controls to filter the list by status and sort it by date, title, or status.

- [x] T029 [P] [US3] Create UI controls for filtering and sorting in `frontend/src/components/tasks/TaskControls.tsx`.
- [x] T030 [US3] Integrate `TaskControls.tsx` into the main tasks page `frontend/src/app/tasks/page.tsx`.
- [x] T031 [US3] Implement the client-side filtering and sorting logic within the `TaskList.tsx` component.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements for user experience and robustness.

- [x] T032 [P] Implement loading indicators (e.g., spinners) for all data-fetching operations.
- [x] T033 [P] Implement a global notification/toast system for displaying success and error messages.
- [x] T034 Review the entire application for UI/UX consistency and responsiveness.
- [ ] T035 **[USER ACTION]** Validate the final application by following the steps in `quickstart.md`.

---

## Dependencies & Execution Order

- **Setup (Phase 1)** must be completed first. Task T007 is a manual blocking step.
- **Foundational (Phase 2)** depends on Phase 1 and blocks all user stories.
- **User Story 1 (Phase 3)** is the MVP and depends on Phase 2.
- **User Story 2 & 3** can begin after Phase 2 is complete. They can be developed in parallel with each other if desired.
- **Polish (Phase 6)** should be done after all desired user stories are complete.
