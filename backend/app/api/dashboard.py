from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.models.employee import Employee
from app.models.project import Project
from app.models.task import Task

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):
    total_employees = db.query(Employee).count()

    total_projects = db.query(Project).count()

    total_tasks = db.query(Task).count()

    completed_tasks = db.query(Task).filter(
        Task.status == "Completed"
    ).count()

    pending_tasks = db.query(Task).filter(
        Task.status == "Pending"
    ).count()

    in_progress_tasks = db.query(Task).filter(
        Task.status == "In Progress"
    ).count()

    return {
        "total_employees": total_employees,
        "total_projects": total_projects,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "in_progress_tasks": in_progress_tasks
    }