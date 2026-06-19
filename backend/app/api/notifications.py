from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.models.task import Task

router = APIRouter(
    tags=["Notifications"]
)


@router.get("/notifications/")
def get_notifications(
    db: Session = Depends(get_db)
):
    notifications = []

    tasks = db.query(Task).all()

    for task in tasks:

        if task.status == "Pending":
            notifications.append({
                "type": "warning",
                "message":
                f"Task '{task.title}' is pending."
            })

        elif task.status == "In Progress":
            notifications.append({
                "type": "info",
                "message":
                f"Task '{task.title}' is in progress."
            })

        elif task.status == "Completed":
            notifications.append({
                "type": "success",
                "message":
                f"Task '{task.title}' completed successfully."
            })

    return notifications