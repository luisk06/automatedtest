@complete @taking @phone @forms @formsTakerPhoneNumberQuestion @formsTaking

Feature: Answering phone question in forms

	As an user
	I want to answers the phone question
	In order to send you phone

	Scenario: The user answers the phone number question in forms
		Given the user has an app
			And that the user has a "forms" with "phone" question left
		When the user take the qrvey
			And the user selects answers in "phone" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page