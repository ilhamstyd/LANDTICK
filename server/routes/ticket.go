package routes

import (
	"landtick/handlers"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	TicketRepository := repositories.RepositoryTicket(mysql.DB)

	h := handlers.HandlerTicket(TicketRepository)

	e.GET("/tickets", h.FindTicket)
	e.POST("/ticket", h.CreateTicket)
	e.GET("/ticket/:id", h.GetTicket)
	e.GET("/filter-ticket", h.FilterTicket)
	// e.GET("/get-myticket", h.GetMyTicket)
}
