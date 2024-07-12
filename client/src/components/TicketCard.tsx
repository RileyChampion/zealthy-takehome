import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, TextField } from '@mui/material';
import React from 'react';
import './TicketCard.css';
import { red } from '@mui/material/colors';

interface TicketCardProps {
    openModal : (ticket: Ticket) => void
    ticket: Ticket
}

type Status = 'NEW' | 'IN PROGRESS' | 'RESOLVED';

const statusColors: Record<Status, string> = {
    NEW: 'default',
    'IN PROGRESS': 'warning',
    RESOLVED: 'success'
}

function TicketCard ({openModal, ticket} : TicketCardProps) {



    return (
        <Card
            sx={{ maxWidth: 345 }}
        >
            <CardActionArea onClick={() => openModal(ticket)}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }}>
                            {ticket.user.charAt(0)}
                        </Avatar>
                    }
                    title={ticket.user}
                    subheader={ticket.created_at.toString()}
                />
                <CardContent>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        sx={{
                        "& .MuiInputBase-input": {
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }
                        }}
                        fullWidth
                        value={ticket.description}
                        rows={2}
                    />
                </CardContent>
                <CardActions>
                    <Chip 
                        label="ticket-status"
                        color={statusColors[ticket.status]}
                    />
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default TicketCard;