from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db

from app.models.task import Task

from app.schemas.task import (
    TaskCreate,
    TaskOut
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post("/", response_model=TaskOut)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):
    new_task = Task(
        title=task.title,
        status=task.status,
        employee_id=task.employee_id,
        project_id=task.project_id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/", response_model=list[TaskOut])
def get_tasks(
    db: Session = Depends(get_db)
):
    return db.query(Task).all()


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if task:
        db.delete(task)
        db.commit()

    return {
        "message": "Task deleted"
    }


@router.put("/{task_id}")
def update_task(
    task_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if task:
        task.status = status
        db.commit()

    return {
        "message": "Task updated"
    }