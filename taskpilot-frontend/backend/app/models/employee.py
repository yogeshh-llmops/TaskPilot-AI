from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.db import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    department = Column(String, nullable=False)

    designation = Column(String, nullable=False)

    joining_date = Column(Date)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )