from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.models.task import Task
from app.models.employee import Employee
from app.models.project import Project

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/summary")
def analytics_summary(
    db: Session = Depends(get_db)
):
    tasks = db.query(Task).all()
    employees = db.query(Employee).all()
    projects = db.query(Project).all()

    pending = len(
        [t for t in tasks if t.status == "Pending"]
    )

    progress = len(
        [t for t in tasks if t.status == "In Progress"]
    )

    completed = len(
        [t for t in tasks if t.status == "Completed"]
    )

    workload = {}

    for task in tasks:
        if task.employee_id:
            workload[task.employee_id] = (
                workload.get(task.employee_id, 0) + 1
            )

    return {
        "total_employees": len(employees),
        "total_projects": len(projects),
        "total_tasks": len(tasks),

        "pending": pending,
        "progress": progress,
        "completed": completed,

        "workload": workload
    }