package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	UserRoutes(e)
	AuthRoutes(e)
	StationRoutes(e)
	TicketRoutes(e)
	ProfileRoutes(e)
	TransactionRoutes(e)
}
