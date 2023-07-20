package routes

import (
	"landtick/handlers"
	"landtick/pkg/middleware"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	TransactionRepository := repositories.RepositoryTransaction(mysql.DB)
	UserRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerTransaction(TransactionRepository, UserRepository)

	e.GET("/transactions", h.FindTransactions)
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.DELETE("/transaction/:id", h.DeleteTransaction)
	e.GET("/transaction-client", middleware.Auth(h.GetTransactionByClient))
	e.POST("/notification", h.Notification)
	e.GET("/getpayment/:id", h.GetPayment)
}
