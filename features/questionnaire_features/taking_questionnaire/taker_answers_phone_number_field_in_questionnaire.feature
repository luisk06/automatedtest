@todo @deprecated @taking @phone @questionnaire @questionnaireTakerPhoneNumberQuestion @questionnaireTaking

Feature: The user answers phone question in questionnaire

	As an user
	I want to answers the phone question
	In order to send you phone

	Scenario: The user answers the phone number question in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "phone" question left
		When the user take the qrvey
			And the user selects answers in "phone" question
			And the user clicks the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page