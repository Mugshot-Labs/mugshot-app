from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def hello():
    return {"message": "Hello World"}
