package handlers

import (
	dto "landtick/dto/result"
	stationdto "landtick/dto/station"
	"landtick/models"
	"landtick/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

type handlerStation struct {
	StationRepository repositories.StationRepository
}

func HandlerStation(StationRepository repositories.StationRepository) *handlerStation {
	return &handlerStation{StationRepository}
}

func (h *handlerStation) FindAllStation(c echo.Context) error {
	stations, err := h.StationRepository.FindAllStations()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	response := dto.SuccessResult{
		Status: "SUCCESS",
		Data: map[string][]models.Station{
			"stations": stations,
		},
	}

	return c.JSON(http.StatusOK, response)
}

func (h *handlerStation) GetStationById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	station, err := h.StationRepository.GetStationById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	response := dto.SuccessResult{
		Status: "SUCCESS",
		Code:   http.StatusOK,
		Data: map[string]interface{}{
			"station": station,
		},
	}

	return c.JSON(http.StatusOK, response)
}

func (h *handlerStation) CreateStation(c echo.Context) error {
	request := new(stationdto.CreateStationRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	station := models.Station{
		Name: request.Name,
		Kota: request.Kota,
	}

	data, err := h.StationRepository.CreateStation(station)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "SUCCESS", Data: data})
}

func (h *handlerStation) UpdateStation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	request := new(stationdto.UpdateStationRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	stasiun, err := h.StationRepository.GetStationById(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Name != "" {
		stasiun.Name = request.Name
	}

	if request.Kota != "" {
		stasiun.Kota = request.Kota
	}

	data, err := h.StationRepository.UpdateStation(stasiun)
	if err != nil {
		return c.JSON(http.StatusInternalServerError,
			dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseStation(data)})
}

func (h *handlerStation) DeleteStation(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	station, err := h.StationRepository.GetStationById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.StationRepository.DeleteStation(station)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Status: "SUCCESS", Data: data})
}

func convertResponseStation(u models.Station) stationdto.StationResponse {
	return stationdto.StationResponse{
		Name: u.Name,
		Kota: u.Kota,
	}
}
