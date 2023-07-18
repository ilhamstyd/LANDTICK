package handlers

import (
	dto "landtick/dto/result"
	transactiondto "landtick/dto/transaction/transaction"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

var send_file = "http://localhost:5000/uploads/"

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
	UserRepository        repositories.UserRepository
}

type dataTransaction struct {
	Transaction interface{} `json:"transaction"`
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository, UserRepository repositories.UserRepository) *handlerTransaction {
	return &handlerTransaction{
		TransactionRepository: TransactionRepository,
		UserRepository:        UserRepository,
	}
}
func (h *handlerTransaction) CreateTransaction(c echo.Context) error {

	TicketID, _ := strconv.Atoi(c.FormValue("ticket_id"))
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	request := transactiondto.CreateTransactionRequest{
		TicketID: TicketID,
		UserID:   int(userId),
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transaction := models.Transaction{
		UserID:   request.UserID,
		TicketID: request.TicketID,
		// Image:    send_file + request.Image,
	}

	data, err := h.TransactionRepository.CreateTransaction(transaction)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Status: "SUCCESS", Data: data})
}

func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	transaction, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	for i, p := range transaction {
		transaction[i].Image = send_file + p.Image
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}

func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Status: "SUCCESS", Data: transaction})
}

func (h *handlerTransaction) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Status: "SUCCESS", Data: data})
}

func (h *handlerTransaction) GetTransactionByClient(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))

	transaction, err := h.TransactionRepository.GetTransactionByClient(userId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Status: "SUCCESS", Data: transaction})
}

// func convertResponeTRC(jon models.Transaction) transactiondto.TransactionResponse {
// 	return transactiondto.TransactionResponse{
// 		ID:       jon.ID,
// 		UserID:   jon.UserID,
// 		TicketID: jon.TicketID,
// 		Status:   jon.Status,
// 		Image:    jon.Image,
// 	}
// }
