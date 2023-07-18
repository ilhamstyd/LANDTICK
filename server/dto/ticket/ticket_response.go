package ticketdto

type TicketResponse struct {
	ID             int    `json:"id"`
	TrainName      string `json:"name_train"`
	TrainType      string `json:"type_train"`
	StartDate      string `json:"start_date"`
	StartStationID int    `json:"start_station_id"`
	StartTime      string `json:"start_time" `
	EndStationID   int    `json:"end_station_id"`
	ArrivalTime    string `json:"arrival_time"`
	Price          int    `json:"price"`
	Stock          int    `json:"stock"`
}

// type TicketResponseDTOGet struct {
// 	ID             int            `json:"id"`
// 	TrainName      string         `json:"name_train" validate:"required"`
// 	TrainType      string         `json:"type_train" validate:"required"`
// 	StartDate      string         `json:"start_date" validate:"required"`
// 	StartStationID int            `json:"-"`
// 	StartStation   models.Station `json:"start_station"`
// 	StartTime      string         `json:"start_time" validate:"required"`
// 	EndStationID   int            `json:"-" `
// 	EndStation     models.Station `json:"end_station"`
// 	ArrivalTime    string         `json:"arival_time" validate:"required"`
// 	Price          int            `json:"price" validate:"required"`
// }

// type TransactionTicketResponse struct {
// 	ID     int                  `json:"-"`
// 	Ticket TicketResponseDTOGet `json:"ticket"`
// 	User   models.UserResponse  `json:"user"`
// }
