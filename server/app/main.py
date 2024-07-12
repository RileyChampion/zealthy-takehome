from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from models.ticket import Ticket
from models.comment import Comment
from db.supabase import create_supabase_connection
from time import gmtime, strftime
from fastapi.middleware.cors import CORSMiddleware

supabase = create_supabase_connection()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(HTTPException)
async def http_exception_handler(_, exc):
    return PlainTextResponse(str(exc.detail), status_code=exc.status_code)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/tickets", status_code=200)
async def tickets():
    return supabase.from_("Tickets").select("*").execute()

@app.get("/ticket/{ticket_id}", status_code=200)
async def get_ticket(ticket_id):
    return supabase.from_("Tickets").select("*").eq("id", ticket_id).execute()

@app.post("/ticket/", status_code=201)
async def submit_ticket(ticket: Ticket):
    return supabase.from_("Tickets")\
        .insert({"user": ticket.user, "email" : ticket.email, "description": ticket.description, "status" : "NEW"})\
        .execute()

@app.put("/ticket/{ticket_id}", status_code=201)
async def change_status_on_ticket(ticket_id, status : str):

    if not status.upper() in ["NEW", "IN_PROGRESS", "RESOLVED"]:
        raise HTTPException(status_code=400, detail="[Error]: Unsupported status entered.")

    # Check if ticket exists
    tickets = supabase.from_("Tickets")\
        .select("*")\
        .eq("id", ticket_id)\
        .execute()

    if len(tickets.data) == 0:
        raise HTTPException(status_code=404, detail="[Error]: Ticket does not exists.")
    
    ticket = supabase.from_("Tickets")\
        .update({"status" : status})\
        .eq("id", ticket_id)\
        .execute()

    if ticket:
        return {"message": "Ticket status updated."}

@app.post("/ticket/{ticket_id}/comment")
async def add_comment_to_ticket(ticket_id, comment: Comment):

    # Check if ticket exists
    ticket = supabase.from_("Tickets")\
        .select("*")\
        .eq("id", ticket_id)\
        .execute()

    if len(ticket.data) == 0:
        raise HTTPException(status_code=404, detail="[Error]: Ticket does not exists.")

    if ticket:

        print("Would normally send email here with body:\n")
        print(f"Dear {ticket.data[0]['user']},\n",
                f"A new comment was added to your support ticket:\n",
                "-------------------------------------------------\n",
                f"{comment.comment}\n\n",
                f"Updated At: {strftime('%Y-%m-%d %H:%M:%S', gmtime())}\n",
                "-------------------------------------------------\n")

        return {"message": f"Comment added to {ticket_id}"}
