@complete @accessing @newDashboard

Feature: User access dashboard

	As an user
	I want to access the dashboard of webform
	In order have access to all the features webform offers in one place

  	@smokeTest @userFirst @luism
	Scenario: the user has no applications
		Given the user has "basic" plan
			And the user has not apps
		When the user logs in
		Then the main dashboard should be displayed

	@smokeTest
	Scenario: the user has an application
		Given the user has "basic" plan
			And the user has an app
		When the user logs in
		Then the main dashboard should be displayed
			And the main application box should be displayed
			And the application search field should be displayed
			And the applications created should be displayed