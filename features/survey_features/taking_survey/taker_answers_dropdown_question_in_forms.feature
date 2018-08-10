@complete @taking @dropdown @survey @surveyTakerDropdown @surveyTaking

Feature: Answering dropdown question in survey

	As an user
	I want to answers the dropdown question
	In order to choice any answer

	Scenario: The user answers the dropdown question in survey
		Given the user has an app
			And that the user has a "survey" with "dropdown" question left
		When the user take the qrvey
			And the user selects answers in "dropdown" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page