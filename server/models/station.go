package models

type Station struct {
	ID   int    `json:"ID" gorm:"primary_key:auto_increment"`
	Kota string `json:"kota" gorm:"type: varchar(255)"`
	Name string `json:"name" gorm:"type: varchar(255)"`
}

func (Station) TableName() string {
	return "station"
}
