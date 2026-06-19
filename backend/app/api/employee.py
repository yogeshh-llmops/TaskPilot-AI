from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.models.employee import Employee
from app.models.task import Task

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeOut
)

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


# CREATE EMPLOYEE
@router.post("/", response_model=EmployeeOut)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):
    new_employee = Employee(
        user_id=employee.user_id,
        department=employee.department,
        designation=employee.designation,
        joining_date=employee.joining_date
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


# GET ALL EMPLOYEES
@router.get("/", response_model=list[EmployeeOut])
def get_employees(
    db: Session = Depends(get_db)
):
    return db.query(Employee).all()


# GET SINGLE EMPLOYEE
@router.get("/{employee_id}", response_model=EmployeeOut)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


# UPDATE EMPLOYEE
@router.put("/{employee_id}", response_model=EmployeeOut)
def update_employee(
    employee_id: int,
    employee_data: EmployeeCreate,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    employee.user_id = employee_data.user_id
    employee.department = employee_data.department
    employee.designation = employee_data.designation
    employee.joining_date = employee_data.joining_date

    db.commit()
    db.refresh(employee)

    return employee


# DELETE EMPLOYEE
@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    # Delete all tasks assigned to employee
    db.query(Task).filter(
        Task.employee_id == employee_id
    ).delete()

    db.delete(employee)

    db.commit()

    return {
        "message": "Employee and assigned tasks deleted successfully"
    }