@todo @deprecated @taking @email @questionnaire @questionnaireTakerEmailQuestion @questionnaireTaking

Feature: The user answers email question in questionnaire

	As an user
	I want to answers the email question
	In order to send you email

	Scenario: The user answers the email question in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "email" question left
		When the user take the qrvey
			And the user selects answers in "email" question
			And the user clicks the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page