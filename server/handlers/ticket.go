package handlers

import (
	"fmt"
	dto "landtick/dto/result"
	ticketdto "landtick/dto/ticket"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerTicket struct {
	TicketRepository repositories.TicketRepository
}

func HandlerTicket(TicketRepository repositories.TicketRepository) *handlerTicket {
	return &handlerTicket{TicketRepository}
}
func (h *handlerTicket) CreateTicket(c echo.Context) error {

	startStationID, _ := strconv.Atoi(c.FormValue("start_station_id"))
	endStationID, _ := strconv.Atoi(c.FormValue("end_station_id"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	stock, _ := strconv.Atoi(c.FormValue("stock"))

	// request := models.CreateTicket{
	// 	TrainName: c.FormValue("train_name"),
	// 	TrainType: c.FormValue("train_type"),
	// 	StartDate: c.FormValue("start_date"),
	// 	ArrivalTime: c.FormValue("a"),

	// }

	ticket := models.CreateTicket{
		TrainName:      c.FormValue("train_name"),
		TrainType:      c.FormValue("train_type"),
		StartDate:      c.FormValue("start_date"),
		StartStationID: startStationID,
		StartTime:      c.FormValue("start_time"),
		EndStationID:   endStationID,
		ArrivalTime:    c.FormValue("arrival_time"),
		Price:          price,
		Stock:          stock,
	}
	validation := validator.New()
	err := validation.Struct(ticket)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TicketRepository.CreateTicket(ticket)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Status: "SUCCESS", Data: convertResponseTicket(data)})
}

func (h *handlerTicket) FindTicket(c echo.Context) error {
	ticket, err := h.TicketRepository.FindTicket()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: ticket, Message: "SUCCESS"})
}

func (h *handlerTicket) GetTicket(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	ticket, err := h.TicketRepository.GetTicket(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Status: "SUCCESS", Data: ticket})
}

func (h *handlerTicket) FilterTicket(c echo.Context) error {
	// StartDate := c.FormValue("start_date")
	startStationIDParam := c.QueryParam("startStationId")
	endStationIDParam := c.QueryParam("endStationId")
	fmt.Println("ini param :", startStationIDParam, endStationIDParam)

	var startStationID int
	if startStationIDParam != "" {
		var err error
		startStationID, err = strconv.Atoi(startStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		}
	}
	var endStationID int
	if endStationIDParam != "" {
		var err error
		endStationID, err = strconv.Atoi(endStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		}
	}

	ticket, err := h.TicketRepository.FilterTicket(startStationID, endStationID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Message: "SUCCESS", Data: ticket})

}

func convertResponseTicket(jon models.CreateTicket) ticketdto.TicketResponse {
	return ticketdto.TicketResponse{
		ID:             jon.ID,
		TrainName:      jon.TrainName,
		TrainType:      jon.TrainType,
		StartDate:      jon.StartDate,
		StartStationID: jon.StartStationID,
		StartTime:      jon.StartTime,
		EndStationID:   jon.EndStationID,
		ArrivalTime:    jon.ArrivalTime,
		Price:          jon.Price,
		Stock:          jon.Stock,
	}
}

// func (h *handlerTicket) GetMyTicket(c echo.Context) error {
// 	UserIDParam := c.QueryParam("user_id")
// 	TicketIDParam := c.QueryParam("ticket_id")

// 	var UserID int
// 	if UserIDParam != "" {
// 		var err error
// 		UserID, err = strconv.Atoi(UserIDParam)
// 		if err != nil {
// 			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 		}
// 	}
// 	var TicketID int
// 	if TicketIDParam != "" {
// 		var err error
// 		TicketID, err = strconv.Atoi(TicketIDParam)
// 		if err != nil {
// 			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 		}

// 	}
// 	ticket, err := h.TicketRepository.GetMyTicket(UserID, TicketID)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{
// 		Status: "Success",
// 		Data:   ticket,
// 	})

// }

// func convertResponseMyTicket(t models.Ticket) ticketdto.TicketResponseDTOGet {
// 	return ticketdto.TicketResponseDTOGet{
// 		ID:           t.ID,
// 		TrainName:    t.TrainName,
// 		TrainType:    t.TrainType,
// 		StartDate:    t.StartDate,
// 		StartStation: t.StartStation,
// 		StartTime:    t.StartTime,
// 		EndStation:   t.EndStation,
// 		ArrivalTime:  t.ArrivalTime,
// 		Price:        t.Price,
// 	}
// }

// func convertResponseMyTicketTRC(t models.GetMyTicket) ticketdto.TransactionTicketResponse {
// 	return ticketdto.TransactionTicketResponse{
// 		Ticket: convertResponseMyTicket(t.Ticket),
// 		User:   t.User,
// 	}
// }
