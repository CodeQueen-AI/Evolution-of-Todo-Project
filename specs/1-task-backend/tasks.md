# Tasks: Todo App Backend - Phase II

**Input**: Design documents from `specs/1-task-backend/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api.yaml, quickstart.md

**Tests**: Test tasks are included as they are crucial for a robust backend.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Python 3.11 project with Poetry and FastAPI in the project root.
- [x] T002 Configure `pytest` for testing in `pyproject.toml` and `pytest.ini`.
- [x] T003 [P] Configure linting (`flake8`, `black`) and formatting tools in `pyproject.toml` and relevant config files.
- [x] T004 [P] Implement basic configuration management using environment variables (e.g., `pydantic-settings`) in `src/config.py`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Set up PostgreSQL database connection and ORM (`SQLAlchemy` with `asyncpg`) in `src/database.py`.
- [x] T006 Implement basic JWT authentication middleware for API in `src/middleware/auth.py`.
- [x] T007 Configure global error handling and logging in `src/main.py` and `src/logging_config.py`.
- [x] T008 Define base Task model for ORM (`SQLAlchemy`) in `src/models/task.py`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create and View Tasks (Priority: P1) 🎯 MVP

**Goal**: Authenticated users can create new tasks and view all their existing tasks, optionally filtered and sorted.

**Independent Test**: Create a task via API, then retrieve it via list API with various filters/sorts. Verify data integrity and correct filtering/sorting.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T009 [P] [US1] Write unit tests for `Task` model definition and basic validation in `tests/unit/test_task_model.py`.
- [x] T010 [P] [US1] Write unit tests for `task_service` methods (create, list) in `tests/unit/test_task_service.py`.
- [x] T011 [P] [US1] Write integration tests for POST `/api/{user_id}/tasks` endpoint (creation) in `tests/integration/test_api_tasks.py`.
- [x] T012 [P] [US1] Write integration tests for GET `/api/{user_id}/tasks` endpoint (listing, filters, sort) in `tests/integration/test_api_tasks.py`.

### Implementation for User Story 1

- [x] T013 [US1] Implement Task service methods for creating new tasks and listing tasks (with filtering and sorting logic) in `src/services/task_service.py`.
- [x] T014 [US1] Implement POST `/api/{user_id}/tasks` endpoint in `src/api/tasks.py` to handle task creation requests.
- [x] T015 [US1] Implement GET `/api/{user_id}/tasks` endpoint in `src/api/tasks.py` to handle task listing requests.
- [x] T016 [US1] Add validation logic for task creation (title length, description length) to `src/api/tasks.py` and/or `src/models/task.py`.
- [x] T017 [US1] Integrate JWT authentication middleware with POST and GET `/api/{user_id}/tasks` endpoints.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Manage Individual Tasks (Priority: P1)

**Goal**: Authenticated users can view details, update, delete, and toggle completion status of their individual tasks.

**Independent Test**: Create a task, then perform get-by-id, update, delete, and toggle completion operations on it via API. Verify task ownership enforcement.

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T018 [P] [US2] Write unit tests for `task_service` methods (get by ID, update, delete, toggle completion) in `tests/unit/test_task_service.py`.
- [x] T019 [P] [US2] Write integration tests for GET `/api/{user_id}/tasks/{id}` endpoint in `tests/integration/test_api_tasks.py`.
- [x] T020 [P] [US2] Write integration tests for PUT `/api/{user_id}/tasks/{id}` endpoint in `tests/integration/test_api_tasks.py`.
- [x] T021 [P] [US2] Write integration tests for DELETE `/api/{user_id}/tasks/{id}` endpoint in `tests/integration/test_api_tasks.py`.
- [x] T022 [P] [US2] Write integration tests for PATCH `/api/{user_id}/tasks/{id}/complete` endpoint in `tests/integration/test_api_tasks.py`.
- [x] T023 [P] [US2] Write integration tests for task ownership checks (403 Forbidden scenarios) across all individual task endpoints in `tests/integration/test_api_tasks.py`.

### Implementation for User Story 2

- [x] T024 [US2] Implement Task service methods for retrieving a task by ID, updating a task, deleting a task, and toggling task completion in `src/services/task_service.py`.
- [x] T025 [US2] Implement GET `/api/{user_id}/tasks/{id}` endpoint in `src/api/tasks.py`.
- [x] T026 [US2] Implement PUT `/api/{user_id}/tasks/{id}` endpoint in `src/api/tasks.py`.
- [x] T027 [US2] Implement DELETE `/api/{user_id}/tasks/{id}` endpoint in `src/api/tasks.py`.
- [x] T028 [US2] Implement PATCH `/api/{user_id}/tasks/{id}/complete` endpoint in `src/api/tasks.py`.
- [x] T029 [US2] Add ownership check logic to all individual task endpoints in `src/api/tasks.py` (e.g., using dependencies in FastAPI).
- [x] T030 [US2] Integrate JWT authentication middleware with individual task endpoints.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T031 Code cleanup and refactoring across the codebase to improve readability and adherence to coding standards.
- [x] T032 Review and update `quickstart.md` with final instructions and any changes from implementation.
- [x] T033 Implement comprehensive OpenAPI documentation generation and serving (if not already handled by FastAPI automatically).
- [x] T034 Performance optimization and profiling for critical endpoints (e.g., list tasks for large datasets).
- [x] T035 Security audit for all endpoints, data handling, and JWT implementation.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- Once Foundational phase completes, User Stories 1 and 2 can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Adhere to Project Constitution principles:
  - **Modularity:** Design tasks to build modular components with clear interfaces.
  - **Testability:** Ensure tasks contribute to features that are easily testable.
  - **Maintainability:** Focus on clear, readable code and good documentation within each task.
