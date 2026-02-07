# Quickstart: AI Chat Service

This document provides a quick overview of how to get started with the AI Chat Service.

## Prerequisites
- A running instance of the application backend.
- A valid JWT for an existing user.

## Sending a message
To send a message, make a POST request to `/api/{user_id}/chat`.

**Request:**
```bash
curl -X POST \
  http://localhost:8000/api/1/chat \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <your_jwt>' \
  -d 
  {
    "message": "Hello, world!"
  }
```

**Response:**
```json
{
  "conversation_id": 1,
  "response": "Hello! How can I help you today?",
  "tool_calls": []
}
```

## Retrieving conversation history
To retrieve the history of a conversation, make a GET request to `/api/{user_id}/chat/{conversation_id}/history`.

**Request:**
```bash
curl -X GET \
  http://localhost:8000/api/1/chat/1/history \
  -H 'Authorization: Bearer <your_jwt>'
```

**Response:**
```json
[
  {
    "id": 1,
    "conversation_id": 1,
    "user_id": 1,
    "role": "user",
    "content": "Hello, world!",
    "created_at": "2026-01-15T12:00:00Z"
  },
  {
    "id": 2,
    "conversation_id": 1,
    "user_id": 1,
    "role": "assistant",
    "content": "Hello! How can I help you today?",
    "created_at": "2026-01-15T12:00:01Z"
  }
]
```
