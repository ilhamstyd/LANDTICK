package profiledto

type ProfileResponse struct {
	ID    int    `json:"id" gorm:"primary_key:auto_increment"`
	Photo string `json:"photo" gorm:"type: varchar(255)"`
}
