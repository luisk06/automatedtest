@complete @taking @email @forms @formsTakerEmailQuestion @formsTaking

Feature: Answering an email question in forms

	As an user
	I want to answers the email question
	In order to send you email

	Scenario: The user answers an email question in forms
		Given the user has an app
			And that the user has a "forms" with "email" question left
		When the user take the qrvey
			And the user selects answers in "email" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page