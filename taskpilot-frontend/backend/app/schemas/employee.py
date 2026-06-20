from pydantic import BaseModel
from datetime import date

class EmployeeCreate(BaseModel):
    user_id: int
    department: str
    designation: str
    joining_date: date

class EmployeeResponse(BaseModel):
    id: int
    user_id: int
    department: str
    designation: str
    joining_date: date

    class Config:
        from_attributes = True