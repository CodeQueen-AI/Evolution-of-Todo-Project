from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from models.chat import Conversation, Message
from services.chat_repository import ChatRepository

class ChatService:
    def __init__(self, session: AsyncSession):
        self.chat_repo = ChatRepository(session)

    async def get_or_create_conversation(self, user_id: int, conversation_id: Optional[int]) -> Conversation:
        if conversation_id:
            conversation = await self.chat_repo.get_conversation(conversation_id, user_id)
            if conversation:
                return conversation
        # If no conversation_id or not found, create a new one
        return await self.chat_repo.create_conversation(user_id)

    async def process_message(self, user_id: int, conversation_id: Optional[int], message_content: str) -> dict:
        conversation = await self.get_or_create_conversation(user_id, conversation_id)

        # Store user message
        await self.chat_repo.create_message(conversation.id, user_id, "user", message_content)

        # AI agent integration
        # For now, a simple mock response. Real integration would involve:
        # 1. Constructing the conversation history for the AI.
        # 2. Calling the Gemini API (or other AI service) with the history and current message.
        # 3. Parsing the AI's response, which might include text and tool calls.
        # 4. Executing tool calls if any, and processing their results.
        # 5. Forming the final AI response.

        # Placeholder: Echo back the user's message
        ai_response_content = f"You said: {message_content}. (AI integration pending)"
        tool_calls = [] # Placeholder for tool calls

        # Store AI response
        await self.chat_repo.create_message(conversation.id, user_id, "assistant", ai_response_content)

        return {
            "conversation_id": conversation.id,
            "response": ai_response_content,
            "tool_calls": tool_calls,
        }

    async def get_conversation_history(self, user_id: int, conversation_id: int) -> List[Message]:
        conversation = await self.chat_repo.get_conversation(conversation_id, user_id)
        if not conversation:
            return [] # Or raise an error
        return await self.chat_repo.get_messages_by_conversation(conversation_id, user_id)
