# from sqlalchemy.ext.asyncio import create_async_engine
# from sqlalchemy import text
# import asyncio

# DATABASE_URL = "postgresql+asyncpg://neondb_owner:npg_RweP3ZArbOS6@ep-proud-scene-ah2vdov3-pooler.c-3.us-east-1.aws.neon.tech/neondb"

# async def check_table():
#     engine = create_async_engine(DATABASE_URL)
#     async with engine.connect() as conn:
#         # Execute raw SQL to check if 'tasks' table exists
#         result = await conn.execute(text(
#             "SELECT to_regclass('public.tasks')"
#         ))
#         table_exists = result.scalar()
#         if table_exists:
#             print("✅ tasks table exists!")
#         else:
#             print("❌ tasks table does NOT exist!")

# asyncio.run(check_table())
from sqlalchemy.ext.asyncio import create_async_engine
from models import Base  # <- yahan aapka real models file ka name

import asyncio

DATABASE_URL = "postgresql+asyncpg://neondb_owner:npg_RweP3ZArbOS6@ep-proud-scene-ah2vdov3-pooler.c-3.us-east-1.aws.neon.tech/neondb"

async def create_tables():
    engine = create_async_engine(DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # ye sari tables create karega
    print("✅ All tables created successfully!")

asyncio.run(create_tables())
