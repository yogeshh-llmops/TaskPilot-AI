from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import engine, Base

from app.api.auth import router as auth_router
from app.api.employee import router as employee_router
from app.api.project import router as project_router
from app.api.task import router as task_router
from app.api.analytics import router as analytics_router
from app.api.project_progress import router as project_progress_router
from app.api.performance import router as performance_router
from app.api.risk import router as risk_router
from app.api.notifications import router as notifications_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskPilot AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to TaskPilot AI Backend 🚀"
    }

app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(project_router)
app.include_router(task_router)
app.include_router(analytics_router)
app.include_router(project_progress_router)
app.include_router(performance_router)
app.include_router(risk_router)
app.include_router(notifications_router)