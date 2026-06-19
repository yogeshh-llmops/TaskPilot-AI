from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.models.project import Project
from app.models.task import Task

router = APIRouter(tags=["Project Progress"])


@router.get("/project-progress/")
def project_progress(
    db: Session = Depends(get_db)
):
    projects = db.query(Project).all()

    result = []

    for project in projects:

        tasks = db.query(Task).filter(
            Task.project_id == project.id
        ).all()

        total_tasks = len(tasks)

        completed_tasks = len([
            t for t in tasks
            if t.status == "Completed"
        ])

        progress = (
            round(
                (completed_tasks / total_tasks) * 100,
                2
            )
            if total_tasks > 0
            else 0
        )

        result.append({
            "project_id": project.id,
            "project_name": project.project_name,
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "progress_percentage": progress
        })

    return result