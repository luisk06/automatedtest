@todo @deprecated @taking @name @questionnaire @questionnaireTakerNameQuestion @questionnaireTaking

Feature: The user answers name question in questionnaire

	As an user
	I want to answers the name question
	In order to send you name

	Scenario: The user answers the name question in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "name" question left
		When the user take the qrvey
			And the user selects answers in "name" question
			And the user clicks the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page