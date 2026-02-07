import pytest
from datetime import datetime, timedelta
from backend.models.task import Task
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base

# Setup a temporary in-memory SQLite database for testing
DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(DATABASE_URL)
Base = declarative_base()

class TestTask(Base):
    __tablename__ = "tasks" # Use the same table name as the actual Task model

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

@pytest.fixture(scope="function")
def db_session():
    # Create tables
    Base.metadata.create_all(engine)
    Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = Session()
    try:
        yield session
    finally:
        session.close()
        # Drop tables for a clean slate for the next test function
        Base.metadata.drop_all(engine)


def test_create_task(db_session):
    task = Task(user_id="test_user", title="Test Task", description="This is a test description")
    db_session.add(task)
    db_session.commit()
    db_session.refresh(task)

    assert task.id is not None
    assert task.user_id == "test_user"
    assert task.title == "Test Task"
    assert task.description == "This is a test description"
    assert task.completed is False
    assert isinstance(task.created_at, datetime)
    assert isinstance(task.updated_at, datetime)
    assert task.created_at == task.updated_at


def test_task_defaults(db_session):
    task = Task(user_id="another_user", title="Default Task")
    db_session.add(task)
    db_session.commit()
    db_session.refresh(task)

    assert task.description is None
    assert task.completed is False
    assert isinstance(task.created_at, datetime)
    assert isinstance(task.updated_at, datetime)


def test_task_update_timestamp(db_session):
    task = Task(user_id="user1", title="Initial Task")
    db_session.add(task)
    db_session.commit()
    db_session.refresh(task)

    old_updated_at = task.updated_at
    task.title = "Updated Task"
    db_session.add(task)
    db_session.commit()
    db_session.refresh(task)

    assert task.title == "Updated Task"
    assert task.updated_at > old_updated_at
    assert (datetime.utcnow() - task.updated_at) < timedelta(seconds=1)

def test_task_repr():
    task = Task(id=1, user_id="test_user", title="Sample Task")
    assert repr(task) == "<Task(id=1, title='Sample Task', user_id='test_user')>"

def test_task_title_not_nullable():
    with pytest.raises(Exception): # SQLAlchemy will raise an exception for NOT NULL violation
        Task(user_id="test_user", description="Description only")

def test_task_user_id_not_nullable():
    with pytest.raises(Exception): # SQLAlchemy will raise an exception for NOT NULL violation
        Task(title="Title only", description="Description only")
