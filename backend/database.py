# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
# from sqlalchemy.orm import declarative_base
# # from backend.config import settings
# from config import settings
# # Create the asynchronous engine
# engine = create_async_engine(settings.DATABASE_URL, echo=True)

# # Create a sessionmaker
# AsyncSessionLocal = async_sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine,
#     class_=AsyncSession,
#     expire_on_commit=False,
# )

# # Base class for our models
# Base = declarative_base()

# async def get_db():
#     async with AsyncSessionLocal() as session:
#         yield session
# database.py

# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
# from sqlalchemy.orm import declarative_base
# from config import settings

# # Fix: Remove sslmode from DATABASE_URL and use connect_args
# engine = create_async_engine(
#     settings.DATABASE_URL.split("?")[0],  # remove ?sslmode=require&channel_binding=require
#     echo=True,
#     connect_args={"ssl": "True"}       # asyncpg friendly
# )

# AsyncSessionLocal = async_sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine,
#     class_=AsyncSession,
#     expire_on_commit=False,
# )

# Base = declarative_base()

# async def get_db():
#     async with AsyncSessionLocal() as session:
#         yield session








# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
# from sqlalchemy.orm import declarative_base
# from config import settings

# # Base URL without sslmode & channel_binding
# DATABASE_URL = settings.DATABASE_URL.split("?")[0]

# # Async engine
# engine = create_async_engine(
#     DATABASE_URL,
#     echo=True,
#     connect_args={"ssl": True}  # asyncpg friendly
# )

# # Async session
# AsyncSessionLocal = async_sessionmaker(
#     bind=engine,
#     class_=AsyncSession,
#     expire_on_commit=False,
#     autocommit=False,
#     autoflush=False
# )

# # Base for models
# Base = declarative_base()

# # Dependency for FastAPI routes
# async def get_db():
#     async with AsyncSessionLocal() as session:
#         yield session








from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=True,
    connect_args={"ssl": True}
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
