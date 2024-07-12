import { Button, FormControl, MenuItem, Modal } from '@mui/base';
import { Box, Dialog, InputLabel, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './TicketModal.css'
import api from '../utils/api-client.tsx';

interface TicketModalProps {
    isModalOpen: boolean,
    closeModal: () => void,
    ticket: Ticket
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 10000
  };

function TicketModal({isModalOpen, closeModal, ticket}: TicketModalProps) {
    const [comment, setComment] = useState("");
    const [ticketStatus, setTicketStatus] = useState(ticket.status);

    console.log(ticket);

    const onCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handleStatusChange = (e, ticketId) => {
        setTicketStatus(e.target.value);
        api.changeTicketStatus(ticketId, e.target.value);
    }

    const onSubmitComment = (ticektId : bigint, comment: string) => {
        const staffComment : StaffComment = {
            comment
        }
        api.submitComment(ticektId, staffComment)
    }

    return (
        <Dialog
            open={isModalOpen}
            onClose={closeModal}
        >
            <Modal
                open={isModalOpen}
            >
                <Box sx={style}>
                    <div id='ticket-modal-header'>
                        <h4>Support Ticket #{ticket.id.toString()}</h4>
                        <FormControl>
                            <InputLabel id='ticket-modal-status'>Status</InputLabel>
                            <Select
                                id="ticket-status-select"
                                value={ticketStatus}
                                onChange={e => handleStatusChange(e, ticket.id)}
                            >
                                <MenuItem value={"NEW"}>NEW</MenuItem>
                                <MenuItem value={"IN PROGRESS"}>IN PROGRESS</MenuItem>
                                <MenuItem value={"RESOLVED"}>RESOLVED</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div id='ticket-modal-body'>
                        <h5>User: {ticket.user}</h5>
                        <h5>Email: {ticket.email}</h5>
                        <TextField 
                            disabled
                            multiline
                            rows={4}
                            defaultValue={ticket.description}
                            fullWidth
                        />
                    </div>
                    <div id='ticket-modal-footer'>
                        <TextField
                            id='ticket-modal-comment'
                            label="Comment"
                            disabled
                            multiline
                            rows={4}
                            defaultValue={""}
                            variant="outlined"
                            fullWidth
                            onChange={e => onCommentChange(e)}
                        />
                        <Button onClick={() => onSubmitComment(ticket.id, comment)}>Submit</Button>
                    </div>
                </Box>
            </Modal>
        </Dialog>
    );
}

export default TicketModal;