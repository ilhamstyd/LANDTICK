package models

type Profile struct {
	ID     int    `json:"id" gorm:"primary_key:auto_increment"`
	Photo  string `json:"photo" gorm:"type: varchar(255)"`
	UserID int    `json:"user_id" gorm:"type: int"`
}

type ProfileResponse struct {
	Photo  string `json:"photo"`
	UserID int    `json:"-"`
}

func (ProfileResponse) TableName() string {
	return "profiles"
}
