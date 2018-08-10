@todo @deprecated @taking @usAddress @questionnaire @questionnaireTakerUsAddressQuestion @questionnaireTaking

Feature: The user answers us address question in questionnaire

	As an user
	I want to answers the us address question
	In order to send you us address

	Scenario: The user answers the us address question in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "us_address" question left
		When the user take the qrvey
			And the user selects answers in "us_address" question
			And the user clicks the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page