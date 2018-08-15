@todo @applications @launching

Feature: The user launch an application from dashboard

	As an user
	I want to launch an application
	In order to show all them that I build it

	Scenario: The user open an application created
		Given the user has "standard" plan
			And the user has an app
			And the user into the app has 1 "webform"
			And the user into the app has 1 "page"
			And the user has login
		When the user is on the app dashboard
			And the user clicks on the application menu
			And the user clicks on the open application option