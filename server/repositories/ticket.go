package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type TicketRepository interface {
	CreateTicket(ticket models.CreateTicket) (models.CreateTicket, error)
	FindTicket() ([]models.Ticket, error)
	GetTicket(ID int) (models.Ticket, error)
	FilterTicket(StartStationID, EndStationID int) ([]models.Ticket, error)
	// GetMyTicket(UserID int) (models.MyTransactionTicket, error)
	UpdateTicket(ticket models.Ticket) (models.Ticket, error)
}

func RepositoryTicket(db *gorm.DB) *repository {
	return &repository{db}
}

func (r repository) CreateTicket(ticket models.CreateTicket) (models.CreateTicket, error) {
	err := r.db.Create(&ticket).Error

	return ticket, err
}

func (r *repository) FindTicket() ([]models.Ticket, error) {
	var ticket []models.Ticket
	err := r.db.Preload("StartStation").Preload("EndStation").Find(&ticket).Error

	return ticket, err
}

func (r *repository) GetTicket(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.Preload("StartStation").Preload("EndStation").First(&ticket, ID).Error

	return ticket, err
}

// func (r repository) GetMyTicket(UserID int) (models.MyTransactionTicket, error) {
// 	var transaction models.MyTransactionTicket
// 	err := r.db.Where("user_id = ?", UserID).Preload("Ticket.StartStation").Preload("Ticket.EndStation").Preload("User").First(&transaction).Error

// 	return transaction, err

// }

func (r repository) UpdateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Save(&ticket).Error

	return ticket, err
}

func (r repository) FilterTicket(StartStationID, EndStationID int) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Where("start_station_id = ? AND end_station_id = ?", StartStationID, EndStationID).Preload("StartStation").Preload("EndStation").Find(&tickets).Error
	return tickets, err
}
