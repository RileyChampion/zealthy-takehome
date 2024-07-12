type Ticket = {
    id: bigint
    user: string
    email: string
    description: string
    status: string
    created_at: Date
    updated_at: Date
};

type StaffComment = {
    comment: string
}