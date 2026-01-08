# from logging.config import fileConfig

# from sqlalchemy import engine_from_config
# from sqlalchemy import pool

# from alembic import context

# # this is the Alembic Config object, which provides
# # access to the values within the .ini file in use.
# config = context.config

# # Interpret the config file for Python logging.
# # This line sets up loggers basically.
# if config.config_file_name is not None:
#     fileConfig(config.config_file_name)

# # add your model's MetaData object here
# # for 'autogenerate' support
# # from myapp import mymodel
# # target_metadata = mymodel.Base.metadata
# target_metadata = None

# # other values from the config, defined by the needs of env.py,
# # can be acquired:
# # my_important_option = config.get_main_option("my_important_option")
# # ... etc.


# def run_migrations_offline() -> None:
#     """Run migrations in 'offline' mode.

#     This configures the context with just a URL
#     and not an Engine, though an Engine is acceptable
#     here as well.  By skipping the Engine creation
#     we don't even need a DBAPI to be available.

#     Calls to context.execute() here emit the given string to the
#     script output.

#     """
#     url = config.get_main_option("sqlalchemy.url")
#     context.configure(
#         url=url,
#         target_metadata=target_metadata,
#         literal_binds=True,
#         dialect_opts={"paramstyle": "named"},
#     )

#     with context.begin_transaction():
#         context.run_migrations()


# def run_migrations_online() -> None:
#     """Run migrations in 'online' mode.

#     In this scenario we need to create an Engine
#     and associate a connection with the context.

#     """
#     connectable = engine_from_config(
#         config.get_section(config.config_ini_section, {}),
#         prefix="sqlalchemy.",
#         poolclass=pool.NullPool,
#     )

#     with connectable.connect() as connection:
#         context.configure(
#             connection=connection, target_metadata=target_metadata
#         )

#         with context.begin_transaction():
#             context.run_migrations()


# if context.is_offline_mode():
#     run_migrations_offline()
# else:
#     run_migrations_online()
# from logging.config import fileConfig
# from sqlalchemy import pool
# from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
# from alembic import context
# import asyncio

# # Import your Base from your models file
# from database import Base  # <- yahan apne models ka Base import karo
# from config import settings  # tumhara DATABASE_URL

# # Alembic Config object
# config = context.config

# # Logging setup
# if config.config_file_name is not None:
#     fileConfig(config.config_file_name)

# # Target metadata for 'autogenerate'
# target_metadata = Base.metadata

# # Offline migrations (just URL, no engine)
# def run_migrations_offline():
#     url = settings.DATABASE_URL
#     context.configure(
#         url=url,
#         target_metadata=target_metadata,
#         literal_binds=True,
#         dialect_opts={"paramstyle": "named"},
#     )

#     with context.begin_transaction():
#         context.run_migrations()

# # Online migrations (async engine)
# def run_migrations_online():
#     connectable = create_async_engine(
#         settings.DATABASE_URL,
#         poolclass=pool.NullPool,
#     )

#     async def do_run_migrations():
#         async with connectable.connect() as connection:
#             await connection.run_sync(lambda conn: context.configure(
#                 connection=conn,
#                 target_metadata=target_metadata
#             ))
#             await connection.run_sync(lambda conn: context.run_migrations())

#     asyncio.run(do_run_migrations())

# if context.is_offline_mode():
#     run_migrations_offline()
# else:
#     run_migrations_online()







# import asyncio
# from logging.config import fileConfig

# from sqlalchemy import pool
# from sqlalchemy.engine import Connection
# from sqlalchemy.ext.asyncio import async_engine_from_config
# from alembic import context

# from database import Base
# from config import settings

# # Alembic Config object
# config = context.config

# # Logging setup
# if config.config_file_name is not None:
#     fileConfig(config.config_file_name)

# target_metadata = Base.metadata

# # Create async engine for Alembic
# def get_engine():
#     return async_engine_from_config(
#         {
#             "sqlalchemy.url": settings.DATABASE_URL.split("?")[0]
#         },
#         prefix="sqlalchemy.",
#         poolclass=pool.NullPool,
#         connect_args={"ssl": True}  # asyncpg friendly
#     )

# # Run migrations
# async def run_migrations_online():
#     connectable = get_engine()
#     async with connectable.connect() as connection:
#         await connection.run_sync(do_run_migrations)

# def do_run_migrations(connection: Connection):
#     context.configure(
#         connection=connection,
#         target_metadata=target_metadata,
#         compare_type=True
#     )
#     with context.begin_transaction():
#         context.run_migrations()

# # Entry point
# def run_migrations():
#     asyncio.run(run_migrations_online())

# run_migrations()







# import asyncio
# from logging.config import fileConfig

# from sqlalchemy import pool
# from sqlalchemy.engine import Connection
# from sqlalchemy.ext.asyncio import async_engine_from_config
# from alembic import context

# from database import Base
# from config import settings

# # Alembic Config
# config = context.config

# # Logging
# if config.config_file_name is not None:
#     fileConfig(config.config_file_name)

# # Metadata
# target_metadata = Base.metadata

# # ✅ Correct engine (NO split, NO connect_args)
# def get_engine():
#     return async_engine_from_config(
#         {
#             "sqlalchemy.url": settings.DATABASE_URL
#         },
#         prefix="sqlalchemy.",
#         poolclass=pool.NullPool,
#     )

# def do_run_migrations(connection: Connection):
#     context.configure(
#         connection=connection,
#         target_metadata=target_metadata,
#         compare_type=True,
#     )

#     with context.begin_transaction():
#         context.run_migrations()

# async def run_migrations_online():
#     connectable = get_engine()

#     async with connectable.connect() as connection:
#         await connection.run_sync(do_run_migrations)

# def run_migrations():
#     asyncio.run(run_migrations_online())

# run_migrations()








import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from database import Base
from config import settings


# Alembic Config object
config = context.config


# Logging configuration
if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# Metadata for autogenerate
target_metadata = Base.metadata


def get_async_engine():
    """
    Create async engine for Alembic
    IMPORTANT:
    - No sslmode in URL
    - SSL handled via connect_args
    """
    return async_engine_from_config(
        {
            "sqlalchemy.url": settings.DATABASE_URL
        },
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        connect_args={"ssl": True},
    )


def do_run_migrations(connection: Connection):
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online():
    connectable = get_async_engine()

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)


def run_migrations_offline():
    """
    Offline mode (rarely used, but required by Alembic)
    """
    context.configure(
        url=settings.DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
