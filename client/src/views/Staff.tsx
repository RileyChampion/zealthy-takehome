import React, { useEffect, useState } from "react";
import TicketCard from "../components/TicketCard.tsx";
import TicketModal from "../components/TicketModal.tsx";
import ticketAPI from '../utils/api-client.tsx';


function Staff() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket>({
        id: BigInt(-1),
        user: "",
        email: "",
        description: "",
        status: "",
        created_at: new Date('01-17-2021'),
        updated_at: new Date('01-17-2021'),
    });

    //hydrateMethod
    const fetchTickets = async () => {
        setLoading(true);
        try {
            const tx = await ticketAPI.getAllTickets();
            // console.log(tx.data);
            setTickets(tx.data);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTickets();
    }, [refresh])


    const handleRefreshTickets = () => {
        setRefresh(!refresh)
    }

    const openModal = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setSelectedTicket({
            id: BigInt(-1),
            user: "",
            email: "",
            description: "",
            status: "",
            created_at: new Date(),
            updated_at: new Date()
        });
        setIsModalOpen(false);
    }

    return (
        <div>
            <h1>Staff Page</h1>
            {loading ?
                <h3>Loading...</h3>
            :
                <div>
                    {tickets.map(tx => {
                        return(
                            <TicketCard
                                openModal={openModal}
                                ticket={tx} 
                            />
                        )
                    })}
                    <TicketModal
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                        ticket={selectedTicket}
                    />
                </div>
            }
        </div>
    )
}

export default Staff;