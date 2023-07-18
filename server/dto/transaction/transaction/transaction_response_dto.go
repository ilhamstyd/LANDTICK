package transactiondto

type TransactionResponse struct {
	ID       int    `json:"id"`
	UserID   int    `json:"user"`
	TicketID int    `json:"ticket"`
	Status   string `json:"status"`
}
