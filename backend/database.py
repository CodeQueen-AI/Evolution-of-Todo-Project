from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
# from backend.config import settings
from config import settings
# Create the asynchronous engine
engine = create_async_engine(settings.DATABASE_URL, echo=True)

# Create a sessionmaker
AsyncSessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Base class for our models
Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
