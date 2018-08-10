@complete @making @creates_qrveys @survey @surveyMaking

Feature: The user duplicates a survey

	As an user
	I want manages a survey

	Scenario: The user duplicates a survey
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And that the user has a survey in draft
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user counted the amount of webform
		When the user clicks on the webform menu
			And clicks on "Duplicate"
		Then the survey should be duplicated

	Scenario: The user duplicates a survey
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And that the user has a survey in draft
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user counted the amount of webform
		When the user clicks on the webform menu
			And clicks on "Duplicate"
		Then the survey should be duplicated