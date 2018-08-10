@todo @deprecated @taking @questionnaireTaking @address @questionnaire @questionnaireTakerAddressQuestion

Feature: The user answers address question in questionnaire

	As an user
	I want to answers the address question
	In order to send you address

	Scenario: The user answers the address question in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "address" question left
		When the user take the qrvey
			And the user selects answers in "address" question
			And the user clicks the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page