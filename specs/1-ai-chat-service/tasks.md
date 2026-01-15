# Tasks: AI Chat Service

**Input**: Design documents from `/specs/1-ai-chat-service/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure.

- [X] T001 Verify project structure per implementation plan in `specs/1-ai-chat-service/plan.md`.
- [X] T002 Verify Python project with FastAPI dependencies is correctly set up in `backend/`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for the AI Chat Service.

- [X] T003 Create database migration for `Conversation` and `Message` tables using Alembic in `backend/alembic/versions/`.
- [X] T004 Create `Conversation` and `Message` SQLAlchemy models in a new file `backend/models/chat.py`.

---

## Phase 3: User Story 1 - Send Message & Get AI Response (Priority: P1) 🎯 MVP

**Goal**: Allow users to send a message and get a response from the AI.

**Independent Test**: Send a POST request to `/api/{user_id}/chat` and verify the response.

### Implementation for User Story 1

- [X] T005 [US1] Create `ChatRepository` in `backend/services/chat_repository.py` with methods to create/get conversations and messages.
- [X] T006 [US1] Implement `ChatService` in `backend/services/chat_service.py` to handle the logic of processing messages.
- [X] T007 [US1] Create the `POST /api/{user_id}/chat` endpoint in a new file `backend/api/chat.py`.
- [X] T008 [US1] Integrate JWT authentication and user ownership checks in the `POST /api/{user_id}/chat` endpoint.
- [X] T009 [US1] Integrate the AI agent in `ChatService` to process messages and generate responses, including calling MCP tools.

**Checkpoint**: User Story 1 should be fully functional and testable.

---

## Phase 4: User Story 2 - View Conversation History (Priority: P2)

**Goal**: Allow users to view their conversation history.

**Independent Test**: Send a GET request to `/api/{user_id}/chat/{conversation_id}/history` and verify the response.

### Implementation for User Story 2

- [X] T010 [US2] Add `get_conversation_history` method to `ChatRepository` in `backend/services/chat_repository.py`.
- [X] T011 [US2] Add method to `ChatService` in `backend/services/chat_service.py` to retrieve conversation history.
- [X] T012 [US2] Implement the `GET /api/{user_id}/chat/{conversation_id}/history` endpoint in `backend/api/chat.py`.
- [X] T013 [US2] Add JWT authentication and user ownership checks to the `GET` endpoint.

**Checkpoint**: User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Secure Access to Chat (Priority: P1)

**Goal**: Ensure all chat interactions are secure and private.

**Independent Test**: Attempt to access chat endpoints with invalid/mismatched credentials and verify 401/403 responses.

### Implementation for User Story 3

- [X] T014 [US3] Create integration tests in `tests/integration/test_api_chat.py` to verify all security scenarios for the chat endpoints.
- [X] T015 [US3] Manually verify that all error responses for security violations are correct and informative.

**Checkpoint**: All user stories should now be independently functional and secure.

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Stories (Phase 3+)**: Depend on Foundational phase completion.

### User Story Dependencies
- **User Story 1 (P1)**: Depends on Phase 2.
- **User Story 2 (P2)**: Depends on Phase 2. Can be worked on in parallel with US1.
- **User Story 3 (P3)**: Depends on implementation of US1 and US2.

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1 & 2.
2. Complete Phase 3 (User Story 1).
3. **STOP and VALIDATE**: Test User Story 1 independently.

### Incremental Delivery
1. Complete Setup + Foundational.
2. Add User Story 1.
3. Add User Story 2.
4. Add User Story 3.
