from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


# Create Employee
@router.post("/")
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


# Get All Employees
@router.get("/")
def get_all_employees(
    db: Session = Depends(get_db)
):
    employees = db.query(Employee).all()

    return employees


# Get Employee By ID
@router.get("/{employee_id}")
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


# Update Employee
@router.put("/{employee_id}")
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


# Delete Employee
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

    db.delete(employee)
    db.commit()

    return {
        "message": "Employee deleted successfully"
    }