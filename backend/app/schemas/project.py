from pydantic import BaseModel
from datetime import date


class ProjectCreate(BaseModel):
    project_name: str
    description: str
    start_date: date
    end_date: date
    status: str


class ProjectResponse(BaseModel):
    id: int
    project_name: str
    description: str
    start_date: date
    end_date: date
    status: str

    class Config:
        from_attributes = True