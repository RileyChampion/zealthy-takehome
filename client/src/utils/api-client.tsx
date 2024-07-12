import axios from 'axios';
// import 'node';

const API_ENDPOINT = "http://localhost:8000";

export default {
    async getAllTickets () {
        try {
            const res = await axios.get(API_ENDPOINT + '/tickets',);
            return res.data;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },
    async getTicket (ticketId: bigint) {
        try {
            const res = await axios.get(API_ENDPOINT + `/ticket/${ticketId}`);
            return res.data;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },
    async changeTicketStatus (ticketId : bigint, status: string) {
        try {
            const res = await axios.put(API_ENDPOINT + `/ticket/${ticketId}?status=${status}`);
            return res.data;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },
    async submitTicket (ticketPayload : Ticket) {
        try {
            const res = await axios.post(API_ENDPOINT + '/ticket/', ticketPayload);
            return res.data;
        } catch (err) {
            console.error(err.message);
            throw err;
        }
    },
    async submitComment (ticketId : bigint, comment : StaffComment) {
        try {
            const res = await axios.post(API_ENDPOINT + `/tickets/${ticketId}/comment`, comment);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}