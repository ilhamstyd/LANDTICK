package transactiondto

type CreateTransactionRequest struct {
	UserID   int `json:"user_id" form:"user_id"`
	TicketID int `json:"ticket_id" form:"ticket_id"`
}

// type transactionTicketResponse struct {
// 	ID     int                 `json:"-"`
// 	Ticket models.Ticket       `json:"ticket"`
// 	User   models.UserResponse `json:"user"`
// }
