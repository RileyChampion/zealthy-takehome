from unittest.mock import patch

from fastapi.testclient import TestClient

from . import main

import time

client = TestClient(main.app)

sample_tickets = [
    {"id": 1, "user": "test-user1", "email": "testemail1@email.com", "description": "test descrption", "status": "NEW", "created_at": "15315351351", "updated_at": "15315351351"},
    {"id": 2, "user": "test-user2", "email": "testemail2@email.com", "description": "test descrption", "status": "IN_PROGRESS", "created_at": "15315351351", "updated_at": "15315351351"},
    {"id": 3, "user": "test-user3", "email": "testemail3@email.com", "description": "test descrption", "status": "RESOLVED", "created_at": "15315351351", "updated_at": "15315351351"},

]

@patch(main, "execute")
def test_get_all_tickets(execute):
    execute.return_value = {
        "data": sample_tickets,
        "count": 3
    }

