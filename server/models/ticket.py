from pydantic import BaseModel

class Ticket(BaseModel):
    user: str
    email: str
    description: str