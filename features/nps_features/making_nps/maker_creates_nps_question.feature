@complete @nps @npsMaking

Feature: The user creates nps questions

	As an user
	I should creates nps question
	In order to share

	@smokeTest3 @npsTest
	Scenario Outline: The user creates nps question with <plan> plan
		Given the user has "<plan>" plan
			And the user has an app called "Test User NPS"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "nps"
		When the user writes the "<enterpriseName>" of your own enterprise
			And the user clicks outside the nps quetion
			And the user writes "<text>" in the text field question
			And the user clicks outside the nps quetion
		Then the "nps" text should display "<enterpriseName>" in the qrvey
			And  the "textfield" text should display "<text>" in the qrvey
			And the user shoud be able to move to share tab

		Examples:
			| plan      | enterpriseName | text                                             |
			| basic     | Oracle         | Could you please explain your choice? Thank you! |
			| standard  | Oracle         | Could you please explain your choice? Thank you! |
	

	Scenario Outline: The user deletes textfield question with <plan> plan
		Given the user has "<plan>" plan
			And the user has an app called "Test User NPS"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "nps"
			And the user deletes the textfield question
		Then the add textfield question button should be displayed

		Examples:
			| plan      |
			| basic     |
			| standard  |

	Scenario Outline: The user deletes textfield question and adds again with <plan> plan
		Given the user has "<plan>" plan
			And the user has an app called "Test User NPS"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "nps"
			And the user deletes the textfield question
			And the user click on Add text field question
		Then the textfield question should be displayed

		Examples:
			| plan      |
			| basic     |
			| standard  |