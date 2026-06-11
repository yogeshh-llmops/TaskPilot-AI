from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.sql import func
from app.database.db import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    project_name = Column(String, nullable=False)

    description = Column(String)

    start_date = Column(Date)

    end_date = Column(Date)

    status = Column(String, default="Planning")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )