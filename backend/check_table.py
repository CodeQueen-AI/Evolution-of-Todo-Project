from sqlalchemy.ext.asyncio import create_async_engine
from models import Base  

import asyncio

DATABASE_URL = "postgresql+asyncpg://neondb_owner:npg_RweP3ZArbOS6@ep-proud-scene-ah2vdov3-pooler.c-3.us-east-1.aws.neon.tech/neondb"

async def create_tables():
    engine = create_async_engine(DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ All tables created successfully!")

asyncio.run(create_tables())
