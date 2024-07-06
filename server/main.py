from fastapi import FastAPI
from pydantic import BaseModel

class Ticket(BaseModel):
    user: str
    email: str
    description: str
    status: str | None = "NEW"

class Comment(BaseModel):
    comment: str

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/tickets")
async def tickets():
    return {}

@app.get("/ticket/{ticket_id}")
async def get_ticket():
    return {}

@app.post("/ticket/")
async def submit_ticket(ticket: Ticket):
    return {}

@app.put("/ticket/{ticket_id}/status")
async def change_status_on_ticket():
    return {}

@app.post("/ticket/{ticket_id}/comment")
async def add_comment_to_ticket():
    return {}
