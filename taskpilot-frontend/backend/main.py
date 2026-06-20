from fastapi import FastAPI

# Database
from app.database.db import Base, engine

# Models
from app.models.user import User
from app.models.employee import Employee
from app.models.project import Project

# Routers
from app.api.auth import router as auth_router
from app.api.employee import router as employee_router
from app.api.project import router as project_router

# Create all database tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI(
    title="TaskPilot AI",
    version="1.0.0",
    description="AI-Powered Business Automation & Workforce Management Platform"
)

# Register Routers
app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(project_router)


# Home Route
@app.get("/")
def home():
    return {
        "message": "TaskPilot AI Backend Running 🚀",
        "version": "1.0.0",
        "status": "healthy"
    }


# Health Check Route
@app.get("/health")
def health_check():
    return {
        "status": "OK",
        "database": "connected"
    }