@complete @taking @formsTaking @address @forms @formsTakerAddressQuestion

Feature: Answering address question in forms

	As an user
	I want to answers the address question
	In order to send you address

	Scenario: The user answers the address question in forms
		Given the user has an app
			And that the user has a "forms" with "address" question left
		When the user take the qrvey
			And the user selects answers in "address" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page