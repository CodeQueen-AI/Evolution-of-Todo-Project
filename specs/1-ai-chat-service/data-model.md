# Data Model: AI Chat Service

## Entities

### Conversation
Represents a chat session.

**Fields**:
- `id`: integer (Primary Key)
- `user_id`: integer (Foreign Key to User)
- `created_at`: datetime
- `updated_at`: datetime

### Message
Represents a single message within a conversation.

**Fields**:
- `id`: integer (Primary Key)
- `conversation_id`: integer (Foreign Key to Conversation)
- `user_id`: integer (Foreign Key to User)
- `role`: string ('user' or 'assistant')
- `content`: text
- `created_at`: datetime

## Relationships
- A `User` can have many `Conversations`.
- A `Conversation` belongs to one `User`.
- A `Conversation` can have many `Messages`.
- A `Message` belongs to one `Conversation`.
- A `Message` belongs to one `User`.
