<!--
Sync Impact Report:
Version change: 0.1.0 -> 1.0.0
List of modified principles:
  - Principle 1.1 (Modularity) -> Spec-Driven Development Only
  - Principle 1.2 (Testability) -> Custom Frontend UI (No ChatKit)
  - Principle 1.3 (Maintainability) -> AI as an Interface, Not Logic
Added sections:
  - Principle 4 (Stateless Backend Architecture)
  - Principle 5 (User Ownership & Security)
  - Principle 6 (Tool-Driven AI Behavior)
  - Scope of Phase III
  - Success Criteria
  - Non-Negotiable Rules
Removed sections:
  - N/A
Templates requiring updates:
  - .specify/templates/plan-template.md: ⚠ pending
  - .specify/templates/spec-template.md: ⚠ pending
  - .specify/templates/tasks-template.md: ⚠ pending
Follow-up TODOs: N/A
-->
# Project Constitution

This document outlines the core principles and guidelines governing the development and evolution of the Todo App project. It serves as a foundational agreement for all contributors.

This constitution defines the principles, rules, and constraints for **Phase III** of the Todo application.
The goal is to evolve the Phase II full-stack web app into an **AI-powered conversational Todo chatbot** using **spec-driven development**, where the chatbot UI is built using **Next.js and Tailwind CSS**, and connects to a **FastAPI AI backend**.

## 1. Principles

### 1.1. Spec-Driven Development Only
- **Description:** No chatbot, AI, or MCP feature may be implemented without a written specification. Gemini CLI must generate all implementation code. Manual coding is **not allowed**.
- **Rationale:** Ensures that all development is intentional, documented, and aligned with the project's goals.

### 1.2. Custom Frontend UI (No ChatKit)
- **Description:** The chat UI must be built using **Next.js 16+ App Router** and **Tailwind CSS**. No OpenAI ChatKit or prebuilt chatbot UI libraries may be used. The frontend only handles UI and user interaction.
- **Rationale:** Provides full control over the user experience and avoids reliance on external libraries that may not be a perfect fit for the project.

### 1.3. AI as an Interface, Not Logic
- **Description:** The AI does not contain business logic. All task logic lives in MCP tools and backend services. The AI only interprets intent and invokes tools.
- **Rationale:** Separates concerns and keeps the business logic in a more maintainable and testable part of the system.

### 1.4. Stateless Backend Architecture
- **Description:** The FastAPI backend must remain stateless. Conversation state must be stored in the database. Server restarts must not affect chat continuity.
- **Rationale:** Improves scalability and resilience of the backend.

### 1.5. User Ownership & Security
- **Description:** All chatbot interactions require JWT authentication (Better Auth). The AI can only act on tasks belonging to the authenticated user.
- **Rationale:** Protects user data and ensures that users can only access their own information.

### 1.6. Tool-Driven AI Behavior
- **Description:** The AI can interact with the system **only via MCP tools**. Direct database access by AI is forbidden.
- **Rationale:** Provides a secure and controlled way for the AI to interact with the system.

## 2. Scope of Phase III

### 2.1. Included
- Custom chat UI using Next.js + Tailwind CSS
- FastAPI AI chat backend
- OpenAI Agents SDK
- Official MCP SDK
- Natural language todo management
- Persistent conversations

### 2.2. Excluded
- ChatKit
- Kubernetes
- Kafka / Dapr
- Voice input

## 3. Success Criteria

Phase III is complete when:
- Users chat via a custom Next.js UI
- Messages are sent to FastAPI backend
- AI manages tasks via MCP tools
- Conversation persists after refresh
- JWT auth & user isolation enforced
- All code generated via specs

## 4. Non-Negotiable Rules

- Specs are the source of truth
- Gemini CLI only
- No ChatKit
- MCP tools only

## 5. Governance

### 5.1. Versioning
The constitution follows semantic versioning (MAJOR.MINOR.PATCH).
- **MAJOR:** Backward incompatible governance/principle removals or redefinitions.
- **MINOR:** New principle/section added or materially expanded guidance.
- **PATCH:** Clarifications, wording, typo fixes, non-semantic refinements.

### 5.2. Amendment Procedure
Proposed amendments must be submitted as a pull request, reviewed by at least two core contributors, and approved by a majority.

### 5.3. Compliance Review
All major releases and significant feature implementations will include a review against the current constitution to ensure adherence.

## 6. Document Details

- **PROJECT_NAME:** Todo App – Phase III (AI-Powered Todo Chatbot)
- **CONSTITUTION_VERSION:** 1.0.0
- **RATIFICATION_DATE:** 2026-01-08
- **LAST_AMENDED_DATE:** 2026-01-15