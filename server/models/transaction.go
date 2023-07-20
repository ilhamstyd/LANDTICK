package models

type Transaction struct {
	ID       int    `json:"ID" gorm:"primary_key:auto_increment"`
	UserID   int    `json:"user_id"`
	User     User   `json:"user"`
	TicketID int    `json:"ticket_id"`
	Ticket   Ticket `json:"ticket"`
	Image    string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Status   string `json:"status" form:"status" gorm:"type: varchar(255)"`
}
