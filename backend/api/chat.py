from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

from database import get_db
from services.chat_service import ChatService
from middleware.auth import get_current_user 

router = APIRouter()

@router.post("/api/{user_id}/chat", status_code=status.HTTP_200_OK)
async def post_message(
    user_id: int,
    message: str,
    conversation_id: Optional[int] = None,
    current_user_id: str = Depends(get_current_user), 
    db: AsyncSession = Depends(get_db)
):
    if str(user_id) != str(current_user_id):  
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this user's chat"
        )
    
    chat_service = ChatService(db)
    response_data = await chat_service.process_message(user_id, conversation_id, message)
    return response_data

@router.get("/api/{user_id}/chat/{conversation_id}/history", status_code=status.HTTP_200_OK)
async def get_message_history(
    user_id: int,
    conversation_id: int,
    current_user_id: str = Depends(get_current_user),  
    db: AsyncSession = Depends(get_db)
):
    if str(user_id) != str(current_user_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this user's chat history"
        )
    
    chat_service = ChatService(db)
    history = await chat_service.get_conversation_history(user_id, conversation_id)
    return history


