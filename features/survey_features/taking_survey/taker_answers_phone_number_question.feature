@complete @taking @phone @survey @surveyTakerPhoneNumber @surveyTaking

Feature: Answering phone question in survey

	As an user
	I want to answers the phone question
	In order to send you phone

	Scenario: The user answers the phone number question in survey
		Given the user has an app
			And that the user has a "survey" with "phone" question left
		When the user take the qrvey
			And the user selects answers in "phone" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page