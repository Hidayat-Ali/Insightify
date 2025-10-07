from fastapi import FastAPI


app = FastAPI(title="Insightify API", version="1.0")
@app.get('/')
def home():
    return {"message":"Welcome to Insightify API"}