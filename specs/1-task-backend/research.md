# Research: Todo App Backend - Phase II

**Feature Branch**: `1-task-backend`
**Created**: 2026-01-08

## Technical Decisions

### Python Version
- **Decision**: Python 3.11
- **Rationale**: Python 3.11 is a recent and stable version with performance improvements and new features that will benefit the project.
- **Alternatives considered**: Python 3.9, Python 3.10 (older, fewer improvements).

### Python Web Framework
- **Decision**: FastAPI
- **Rationale**: FastAPI is a modern, fast (thanks to Starlette and Pydantic), web framework for building APIs with Python 3.7+ based on standard Python type hints. It automatically generates OpenAPI (Swagger) and ReDoc documentation, which aligns well with API contract generation.
- **Alternatives considered**: Flask (lighter, but less batteries-included for APIs), Django (more opinionated, often for full-stack, might be overkill for a pure API backend).

### Python Testing Framework
- **Decision**: pytest
- **Rationale**: pytest is a mature full-featured Python testing framework that helps you write better programs. It's known for its simplicity and flexibility, making it easy to write and run tests, and supports a rich plugin architecture.
- **Alternatives considered**: unittest (built-in, but often more verbose), Nose2 (less active development).

### Performance Goals
- **Decision**: Target p95 API response time < 200ms for core task operations; handle up to 100 concurrent requests without significant degradation.
- **Rationale**: These are common performance expectations for backend APIs to ensure a responsive user experience. Specific metrics might be refined based on user traffic projections.
- **Alternatives considered**: N/A (requires further data).

### Scale/Scope Considerations
- **Decision**: Initially support up to 10,000 active users and 1 million tasks.
- **Rationale**: This provides a baseline for design choices regarding database scaling, connection pooling, and resource allocation. These numbers can be adjusted based on initial adoption and growth.
- **Alternatives considered**: N/A (requires further data).
