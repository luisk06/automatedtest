@complete @taking @dropdown @forms @formsTakerDropdown @formsTaking

Feature: Answering dropdown question in forms

	As an user
	I want to answers the dropdown question
	In order to choice any answer

	Scenario: The user answers the dropdown question in forms
		Given the user has an app
			And that the user has a "forms" with "dropdown" question left
		When the user take the qrvey
			And the user selects answers in "dropdown" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page