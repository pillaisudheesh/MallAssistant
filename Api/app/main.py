from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import engine
from app.auth import routes as auth_routes
from app.chatbot import routes as chatbot_routes
import subprocess
import threading
import time
import requests

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="MallMate API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(chatbot_routes.router)

@app.get("/mallassistant/api/")
def root():
    return {"message": "Welcome to MallMate API 👋"}


# ---------------- RASA AUTO-START ----------------
def is_service_alive(url: str, retries: int = 20, delay: float = 2.0):
    """Check if an HTTP service is alive with retries."""
    for _ in range(retries):
        try:
            res = requests.get(url, timeout=2)
            if res.status_code < 500:
                return True
        except Exception:
            pass
        time.sleep(delay)
    return False

def start_rasa_services():
    """Start Rasa Core and Action Server in background threads."""

    def run_rasa():
        print("🚀 Starting Rasa Core (port 5005)...")
        subprocess.run(
            ["python", "-m", "rasa", "run", "--enable-api", "--cors", "*", "--port", "5005"],
            cwd=".",
        )

    def run_actions():
        print("⚙️ Starting Rasa Action Server (port 5055)...")
        subprocess.run(
            ["python", "-m", "rasa", "run", "actions", "--port", "5055"],
            cwd=".",
        )

    # Run both threads
    threading.Thread(target=run_rasa, daemon=True).start()
    threading.Thread(target=run_actions, daemon=True).start()

    # Wait until Rasa Core API is live
    print("⏳ Waiting for Rasa to start...")
    if is_service_alive("http://localhost:5005/status"):
        print("✅ Rasa Core is ready.")
    else:
        print("⚠️ Rasa failed to start in time. Check logs.")

@app.on_event("startup")
def startup_event():
    start_rasa_services()
