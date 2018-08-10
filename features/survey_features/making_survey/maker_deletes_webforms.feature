@complete @making @deletes_qrveys @survey @smokeTest4 @surveyMaking @surveyMakingDeleteWebforms

Feature: The user deletes survey

	As an user
	I want manages a survey

	Background:
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And that the user has a survey in draft
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user counted the amount of webform
		When the user clicks on the qrveys menu
			And clicks on "Delete"

	Scenario: The user deletes qrvey
			And clicks on "Yes" in the confirmation message
		Then the webform should be deleted

	Scenario: The user does not confirm the qrvey remove
			And clicks on "No" in the confirmation message
		Then the webform should not be deleted