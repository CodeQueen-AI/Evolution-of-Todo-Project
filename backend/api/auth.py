from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from middleware.auth import create_access_token  

router = APIRouter()

fake_users_db = {}

# Pydantic Models
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# Signup Endpoint
@router.post("/signup")
async def signup(user: UserCreate):
    """
    Creates a new user and returns an access token.
    """
    if user.email in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Store user in memory (password should be hashed in real app)
    fake_users_db[user.email] = {
        "name": user.name,
        "password": user.password
    }

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# Signin Endpoint
@router.post("/signin")
async def signin(user: UserLogin):
    """
    Authenticates a user and returns an access token.
    """
    db_user = fake_users_db.get(user.email)
    if not db_user or db_user["password"] != user.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
