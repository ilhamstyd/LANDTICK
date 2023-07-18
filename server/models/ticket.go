package models

type Ticket struct {
	ID             int     `json:"id" gorm:"primary_key:auto_increment"`
	TrainName      string  `json:"train_name" gorm:"type:varchar(255)"`
	TrainType      string  `json:"train_type" gorm:"type:varchar(255)"`
	StartStationID int     `json:"start_station_id"`
	StartStation   Station `json:"start_station" gorm:"foreignKey:StartStationID"`
	EndStationID   int     `json:"end_station_id"`
	EndStation     Station `json:"end_station" gorm:"foreignKey:EndStationID"`
	StartDate      string  `json:"start_date" gorm:"type:varchar(255)"`
	StartTime      string  `json:"start_time" gorm:"type:varchar(255)"`
	ArrivalTime    string  `json:"arrival_time" gorm:"type:varchar(255)"`
	Price          int     `json:"price" gorm:"type: int"`
	Stock          int     `json:"stock" gorm:"type: int"`
}

func (Ticket) TableName() string {
	return "tickets"
}

type CreateTicket struct {
	ID             int     `json:"id"`
	TrainName      string  `json:"train_name"`
	TrainType      string  `json:"train_type"`
	StartStationID int     `json:"start_station_id"`
	StartStation   Station `json:"start_station"`
	EndStationID   int     `json:"end_station_id"`
	EndStation     Station `json:"end_station"`
	StartDate      string  `json:"start_date"`
	StartTime      string  `json:"start_time"`
	ArrivalTime    string  `json:"arrival_time" `
	Price          int     `json:"price"`
	Stock          int     `json:"stock"`
}

func (CreateTicket) TableName() string {
	return "tickets"
}
