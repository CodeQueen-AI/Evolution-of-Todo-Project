# Tasks: Todo CLI App

**Input**: Design documents from `/specs/1-todo-cli-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included as Pytest is specified for testing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create base project directories: `src/`, `src/models/`, `src/services/`, `src/cli/`, `tests/`, `tests/unit/`, `tests/integration/`, `tests/functional/`
- [X] T002 Initialize `main.py` entry point file: `src/main.py`
- [X] T003 Configure testing environment by creating `requirements.txt` with `pytest`: `requirements.txt`
- [X] T004 Create `__init__.py` files in `src/`, `src/models/`, `src/services/`, `src/cli/`, `tests/`, `tests/unit/`, `tests/integration/`, `tests/functional/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create `Task` data structure class in `src/models/task.py`
- [X] T006 Implement in-memory `TaskRepository` for `Task` objects in `src/services/task_repository.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Task (Priority: P1) 🎯 MVP

**Goal**: User can add a new todo task to their list, providing a title and an optional description.

**Independent Test**: Can be fully tested by attempting to add a task, then viewing the list to confirm its presence.

- [X] T007 [P] [US1] Create unit tests for `add_task` logic in `tests/unit/test_task_service.py`
- [X] T008 [P] [US1] Create integration tests for CLI "Add Task" interaction in `tests/integration/test_cli_add_task.py`

### Implementation for User Story 1

- [X] T009 [US1] Implement `add_task` method in `TaskService` in `src/services/task_service.py`
- [X] T010 [US1] Implement CLI command for "Add Task" with input validation in `src/cli/commands.py`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Tasks (Priority: P1)

**Goal**: User can see a list of all their current todo tasks, including their ID, title, and completion status.

**Independent Test**: Can be fully tested by adding several tasks, then selecting "View Tasks" to confirm all tasks are displayed correctly.

### Tests for User Story 2 ⚠️

- [X] T011 [P] [US2] Create unit tests for `get_all_tasks` logic in `tests/unit/test_task_service.py`
- [X] T012 [P] [US2] Create integration tests for CLI "View Tasks" interaction in `tests/integration/test_cli_view_tasks.py`

### Implementation for User Story 2

- [X] T013 [US2] Implement `get_all_tasks` method in `TaskService` in `src/services/task_service.py`
- [X] T014 [US2] Implement CLI command for "View Tasks" with appropriate output formatting in `src/cli/commands.py`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Update Task (Priority: P2)

**Goal**: User can modify the title and/or description of an existing task using its unique ID.

**Independent Test**: Can be fully tested by adding a task, then attempting to update its title and/or description using its ID, and verifying the changes via "View Tasks".

### Tests for User Story 3 ⚠️

- [X] T015 [P] [US3] Create unit tests for `update_task` logic in `tests/unit/test_task_service.py`
- [X] T016 [P] [US3] Create integration tests for CLI "Update Task" interaction in `tests/integration/test_cli_update_task.py`

### Implementation for User Story 3

- [X] T017 [US3] Implement `update_task` method in `TaskService` in `src/services/task_service.py`
- [X] T018 [US3] Implement CLI command for "Update Task" with input validation and "not found" handling in `src/cli/commands.py`

**Checkpoint**: All user stories up to US3 should now be independently functional

---

## Phase 6: User Story 4 - Delete Task (Priority: P2)

**Goal**: User can remove a task from their list using its unique ID, after confirming the deletion.

**Independent Test**: Can be fully tested by adding a task, then attempting to delete it and confirming the task is no longer in the list.

### Tests for User Story 4 ⚠️

- [X] T019 [P] [US4] Create unit tests for `delete_task` logic in `tests/unit/test_task_service.py`
- [X] T020 [P] [US4] Create integration tests for CLI "Delete Task" interaction in `tests/integration/test_cli_delete_task.py`

### Implementation for User Story 4

- [X] T021 [US4] Implement `delete_task` method in `TaskService` in `src/services/task_service.py`
- [X] T022 [US4] Implement CLI command for "Delete Task" with confirmation and "not found" handling in `src/cli/commands.py`

**Checkpoint**: All user stories up to US4 should now be independently functional

---

## Phase 7: User Story 5 - Mark Task Complete / Incomplete (Priority: P2)

**Goal**: User can toggle the completion status of a task (mark as complete or incomplete) using its unique ID.

**Independent Test**: Can be fully tested by adding a task, then toggling its completion status multiple times and verifying the status via "View Tasks".

### Tests for User Story 5 ⚠️

- [X] T023 [P] [US5] Create unit tests for `toggle_task_completion` logic in `tests/unit/test_task_service.py`
- [X] T024 [P] [US5] Create integration tests for CLI "Mark Complete/Incomplete" interaction in `tests/integration/test_cli_toggle_completion.py`

### Implementation for User Story 5

- [X] T025 [US5] Implement `toggle_task_completion` method in `TaskService` in `src/services/task_service.py`
- [X] T026 [US5] Implement CLI command for "Mark Complete/Incomplete" with "not found" handling in `src/cli/commands.py`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T027 Implement the main CLI menu loop in `src/main.py`
- [X] T028 Implement graceful error handling for all CLI interactions in `src/cli/error_handler.py` (new file)
- [X] T029 Refine user prompts and output messages across `src/cli/commands.py`
- [X] T030 Create functional tests for end-to-end user flows in `tests/functional/test_e2e.py`
- [X] T031 Run quickstart.md validation, update `quickstart.md` if necessary with final usage examples

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Add Task)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1 - View Tasks)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2 - Update Task)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2 - Delete Task)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 5 (P2 - Mark Task Complete / Incomplete)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before CLI commands
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T001-T004 are sequential for structure, no [P] needed)
- All Foundational tasks marked [P] can run in parallel (T005-T006 are sequential for model/repository)
- Once Foundational phase completes, User Stories 1 and 2 can start in parallel (P1)
- Once Foundational phase completes, User Stories 3, 4, and 5 can start in parallel (P2)
- Within each user story phase, test tasks marked [P] can run in parallel (e.g., unit and integration tests)
- Model creation can be parallelized if multiple models in a story.
- Implementation tasks for different CLI commands within a service might be parallelizable.

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
- [ ] T007 [P] [US1] Create unit tests for `add_task` logic in `tests/unit/test_task_service.py`
- [ ] T008 [P] [US1] Create integration tests for CLI "Add Task" interaction in `tests/integration/test_cli_add_task.py`

# Implement `add_task` and CLI command:
- [ ] T009 [US1] Implement `add_task` method in `TaskService` in `src/services/task_service.py`
- [ ] T010 [US1] Implement CLI command for "Add Task" with input validation in `src/cli/commands.py`
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Add Task)
4. Complete Phase 4: User Story 2 (View Tasks)
5. **STOP and VALIDATE**: Test User Stories 1 & 2 independently (Add and View tasks should be fully functional)
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Add Task)
   - Developer B: User Story 2 (View Tasks)
   - Developer C: User Story 3 (Update Task)
   - Developer D: User Story 4 (Delete Task)
   - Developer E: User Story 5 (Mark Complete / Incomplete)
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
