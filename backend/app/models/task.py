from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.database.db import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(String)

    status = Column(
        String,
        default="Pending"
    )

    employee_id = Column(
        Integer,
        ForeignKey("employees.id"),
        nullable=True
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=True
    )