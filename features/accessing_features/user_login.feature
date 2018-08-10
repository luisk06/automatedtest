@accessing @todo @login

Feature: User log in

	As an User
	I want to log in to Qrvey
	In order to use its services

	@smokeTest1
	Scenario: User has verified its email and has no qrveys
		Given the user doesn't have qrveys
			And the user has verified its email
		When the user logs in
		Then their dashboard should be displayed
			And a verify email remainder should not be displayed
			And the "Welcome to Qrvey!" message should be displayed in the login
			And a create Qrvey button should be displayed

	Scenario: User has verified its email has qrveys
		Given the user has an app
			And that the user has a "survey" with "address" question left
			And the user has verified its email
		When the user logs in
		Then their dashboard should be displayed
			And a verify email remainder should not be displayed
			And a "Welcome to Qrvey!" message should not be displayed in the login
			And a list of their qrveys should be displayed