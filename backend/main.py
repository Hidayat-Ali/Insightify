from fastapi import FastAPI
from routes import data_route
app = FastAPI(title="Insightify API", version="1.0")

app.include_router(data_route.router,prefix='/api/data',tags=['Data'])
@app.get('/')
def home():
    return {"message":"Welcome to Insightify API"}