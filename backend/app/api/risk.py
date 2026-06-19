from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from app.database.deps import get_db
from app.models.project import Project

router = APIRouter(
    tags=["Risk Detection"]
)


@router.get("/risk-analysis/")
def risk_analysis(
    db: Session = Depends(get_db)
):
    projects = db.query(Project).all()

    result = []

    today = date.today()

    for project in projects:

        if project.end_date is None:
            continue

        days_left = (
            project.end_date - today
        ).days

        if days_left < 0:
            risk = "High Risk"

        elif days_left <= 7:
            risk = "Medium Risk"

        else:
            risk = "Low Risk"

        result.append({
            "project_id": project.id,
            "project_name": project.project_name,
            "end_date": project.end_date,
            "days_left": days_left,
            "risk": risk
        })

    return result