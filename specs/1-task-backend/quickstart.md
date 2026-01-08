# Quickstart: Todo App Backend - Phase II

**Feature Branch**: `1-task-backend`
**Created**: 2026-01-08

This document provides a quick guide to set up, configure, and run the Todo App Backend.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

-   **Python 3.11**: The backend is developed using Python 3.11.
-   **Poetry**: Used for dependency management. If not installed, run:
    ```bash
    pip install poetry
    ```
-   **PostgreSQL Database**: A running instance of PostgreSQL.
    -   For development, you can use a local PostgreSQL server or a service like Neon Serverless.
    -   Ensure you have database connection details (host, port, user, password, database name).

## 2. Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```
    (Assuming `1-task-backend` is the active branch)

2.  **Install dependencies**:
    Navigate to the project root and install Python dependencies using Poetry:
    ```bash
    poetry install
    ```

## 3. Configuration

The application relies on environment variables for sensitive information and configuration.

Create a `.env` file in the project root with the following variables:

```
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database_name>"
JWT_SECRET_KEY="your_super_secret_jwt_key"
JWT_ALGORITHM="HS256"
# For example, a default user ID for testing purposes (optional)
DEFAULT_USER_ID="test_user_id"
```

*   Replace `<user>`, `<password>`, `<host>`, `<port>`, `<database_name>` with your PostgreSQL connection details.
*   `JWT_SECRET_KEY` should be a strong, randomly generated key.
*   `JWT_ALGORITHM` should match the algorithm used for generating your JWT tokens (e.g., HS256).

## 4. Running the Application

To start the FastAPI application:

```bash
poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`.

## 5. Basic Usage (Example API Calls)

You will need a valid JWT token to interact with the API. For testing, you might need to mock or integrate with an authentication service to generate a token for a specific `user_id`.

Assume `YOUR_JWT_TOKEN` is a valid JWT for `YOUR_USER_ID`.

### Create a Task (POST /api/{user_id}/tasks)

```bash
curl -X POST "http://localhost:8000/api/YOUR_USER_ID/tasks" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d 
     {
           "title": "Buy groceries",
           "description": "Milk, eggs, bread"
         }
```

### List Tasks (GET /api/{user_id}/tasks)

```bash
curl -X GET "http://localhost:8000/api/YOUR_USER_ID/tasks?status=pending&sort_by=created_at&order=desc" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Task Details (GET /api/{user_id}/tasks/{id})

```bash
curl -X GET "http://localhost:8000/api/YOUR_USER_ID/tasks/123" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Task (PUT /api/{user_id}/tasks/{id})

```bash
curl -X PUT "http://localhost:8000/api/YOUR_USER_ID/tasks/123" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d 
     {
           "title": "Buy organic groceries",
           "description": "Organic milk, free-range eggs, sourdough bread"
         }
```

### Toggle Task Completion (PATCH /api/{user_id}/tasks/{id}/complete)

```bash
curl -X PATCH "http://localhost:8000/api/YOUR_USER_ID/tasks/123/complete" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Delete Task (DELETE /api/{user_id}/tasks/{id})

```bash
curl -X DELETE "http://localhost:8000/api/YOUR_USER_ID/tasks/123" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
