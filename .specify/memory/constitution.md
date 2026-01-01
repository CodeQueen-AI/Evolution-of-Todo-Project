<!--
Sync Impact Report:
Version change: N/A → 0.1.0
List of modified principles:
  - Terminal-Based Application
  - In-Memory Data Storage
  - Clean, Readable, and Modular Code
  - Single-Responsibility Principle
  - Standard Library Only
  - Adherence to Specification
  - Unique Task IDs
  - Graceful Invalid Input Handling
  - Clear User Interaction
Added sections: Non-Goals, Quality Bar.
Removed sections: None (template was generic).
Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
  - .specify/commands/sp.adr.toml ⚠ pending
  - .specify/commands/sp.analyze.toml ⚠ pending
  - .specify/commands/sp.checklist.toml ⚠ pending
  - .specify/commands/sp.clarify.toml ⚠ pending
  - .specify/commands/sp.constitution.toml ⚠ pending
  - .specify/commands/sp.git.commit_pr.toml ⚠ pending
  - .specify/commands/sp.implement.toml ⚠ pending
  - .specify/commands/sp.phr.toml ⚠ pending
  - .specify/commands/sp.plan.toml ⚠ pending
  - .specify/commands/sp.reverse-engineer.toml ⚠ pending
  - .specify/commands/sp.specify.toml ⚠ pending
  - .specify/commands/sp.tasks.toml ⚠ pending
  - .specify/commands/sp.taskstoissues.toml ⚠ pending
Follow-up TODOs: None.
-->
# Python CLI Todo Application Constitution

## Core Principles

### I. Terminal-Based Application
Every feature must run in the terminal (console-based).

### II. In-Memory Data Storage
Data must be stored in memory (no database, no files).

### III. Clean, Readable, and Modular Code
Code must be clean, readable, and modular.

### IV. Single-Responsibility Principle
Follow single-responsibility principle.

### V. Standard Library Only
No external libraries except Python standard library.

### VI. Adherence to Specification
Do not add features outside the specification.

### VII. Unique Task IDs
Every task must have a unique ID.

### VIII. Graceful Invalid Input Handling
The app must handle invalid input gracefully.

### IX. Clear User Interaction
Clear user prompts and outputs are required.

## Non-Goals

- No GUI
- No web framework
- No database
- No authentication

## Quality Bar

- Code must be beginner-friendly.
- Functions must be small and clear.
- Output must be easy to understand.

## Governance
Constitution supersedes all other practices; Amendments require documentation, approval, migration plan. All PRs/reviews must verify compliance; Complexity must be justified.

**Version**: 0.1.0 | **Ratified**: 2025-12-27 | **Last Amended**: 2025-12-27