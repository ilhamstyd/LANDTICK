package ticketdto

type CreateTicketRequest struct {
	TrainName      string `json:"train_name" form:"train_name" validate:"required"`
	TrainType      string `json:"train_type" form:"train_type" validate:"required"`
	StartDate      string `json:"start_date" form:"start_date" validate:"required"`
	StartStationID int    `json:"start_station_id" form:"start_station_id" validate:"required"`
	StartTime      string `json:"start_time" form:"start_time" validate:"required"`
	EndStationID   int    `json:"end_station_id" form:"end_station_id" validate:"required"`
	ArrivalTime    string `json:"arrival_time" form:"arrival_time" validate:"required"`
	Price          int    `json:"price" form:"price" validate:"required"`
	Stock          int    `json:"stock" form:"stock" validate:"required"`
}

type UpdateTicketRequest struct {
	TrainName      string `json:"name_train" form:"name_train" validate:"required"`
	TrainType      string `json:"type_train" form:"type_train" validate:"required"`
	StartDate      string `json:"start_date" form:"start_date_train" validate:"required"`
	StartStationID int    `json:"start_station_id" form:"start_station_id" validate:"required"`
	StartTime      string `json:"start_time" form:"start_time" validate:"required"`
	EndStationID   int    `json:"end_station_id" form:"destination_station_id" validate:"required"`
	ArrivalTime    string `json:"arrival_time" form:"arrival_time" validate:"required"`
	Price          int    `json:"price" form:"price" validate:"required"`
	Stock          int    `json:"stock" form:"stock" validate:"required"`
	UserID         int    `json:"user_id"`
}

type TransTicket struct {
	Qty int `json:"qty" form:"qty"`
}
