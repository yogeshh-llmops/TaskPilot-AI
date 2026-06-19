from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.models.employee import Employee
from app.models.task import Task

router = APIRouter(
    tags=["Performance"]
)

@router.get("/employee-performance/")
def employee_performance(
    db: Session = Depends(get_db)
):
    employees = db.query(Employee).all()

    result = []

    for employee in employees:

        tasks = db.query(Task).filter(
            Task.employee_id == employee.id
        ).all()

        total = len(tasks)

        completed = len([
            t for t in tasks
            if t.status == "Completed"
        ])

        score = (
            round(
                (completed / total) * 100,
                2
            )
            if total > 0
            else 0
        )

        result.append({
            "employee_id": employee.id,
            "department": employee.department,
            "designation": employee.designation,
            "total_tasks": total,
            "completed_tasks": completed,
            "performance_score": score
        })

    return result