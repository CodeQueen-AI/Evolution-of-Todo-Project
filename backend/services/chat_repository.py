from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.chat import Conversation, Message
from datetime import datetime

class ChatRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_conversation(self, user_id: int) -> Conversation:
        conversation = Conversation(user_id=user_id)
        self.session.add(conversation)
        await self.session.commit()
        await self.session.refresh(conversation)
        return conversation

    async def get_conversation(self, conversation_id: int, user_id: int) -> Conversation | None:
        result = await self.session.execute(
            select(Conversation).where(
                Conversation.id == conversation_id,
                Conversation.user_id == user_id
            )
        )
        return result.scalar_one_or_none()

    async def create_message(
        self, conversation_id: int, user_id: int, role: str, content: str
    ) -> Message:
        message = Message(
            conversation_id=conversation_id,
            user_id=user_id,
            role=role,
            content=content,
            created_at=datetime.utcnow()
        )
        self.session.add(message)
        await self.session.commit()
        await self.session.refresh(message)
        return message

    async def get_messages_by_conversation(self, conversation_id: int, user_id: int) -> list[Message]:
        result = await self.session.execute(
            select(Message).where(
                Message.conversation_id == conversation_id,
                Message.user_id == user_id
            ).order_by(Message.created_at)
        )
        return result.scalars().all()
