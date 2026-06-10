from fastapi import FastAPI

app = FastAPI(
    title="TaskPilot AI",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to TaskPilot AI"
    }