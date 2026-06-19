from pydantic import BaseModel
from typing import Optional


class TaskCreate(BaseModel):
    title: str

    status: str = "Pending"

    employee_id: Optional[int] = None

    project_id: Optional[int] = None


class TaskOut(BaseModel):
    id: int

    title: str

    status: str

    employee_id: Optional[int]

    project_id: Optional[int]

    class Config:
        from_attributes = True