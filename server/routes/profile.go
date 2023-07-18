package routes

import (
	"landtick/handlers"
	"landtick/pkg/middleware"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func ProfileRoutes(e *echo.Group) {
	profileRepository := repositories.RepositoryProfile(mysql.DB)
	h := handlers.HandlerProfile(profileRepository)

	e.GET("/profile", h.GetProfile)
	e.GET("/profile", h.FindProfiles)
	e.POST("/profile", h.CreateProfile)
	e.PATCH("/profile", h.UpdateProfile)
	e.DELETE("/profile", middleware.Auth(h.DeleteProfile))
}
