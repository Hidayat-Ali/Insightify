from fastapi import FastAPI
from routes import data_route
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Insightify API", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_route.router,prefix='/api/data',tags=['Data'])
@app.get('/')
def home():
    return {"message":"Welcome to Insightify API"}