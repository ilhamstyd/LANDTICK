package handlers

import (
	dto "landtick/dto/result"
	usersdto "landtick/dto/user"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type handler struct {
	UserRepository repositories.UserRepository
}

type dataUser struct {
	User interface{} `json:"users"`
}

func HandlerUser(UserRepository repositories.UserRepository) *handler {
	return &handler{UserRepository}
}

func (h *handler) FindUsers(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest,
			dto.ErrorResult{Code: http.StatusInternalServerError,
				Status:  http.StatusBadRequest,
				Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusAccepted,
		Status: "SUCCESS", Message: "success",
		Data: dataUser{User: users}})
}

func (h *handler) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUserID(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusAccepted, Status: "SUCCESS", Message: "User data created successfully", Data: convertResponse(user)})
}

func convertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:       u.ID,
		Fullname: u.Fullname,
		Username: u.Username,
		Email:    u.Email,
		Role:     u.Role,
	}
}
