@complete @applications @installing

Feature: The user send an application

	As an user
	I want to install an application
	In order to share all them that I build it

	@deletingAppShared
	Scenario: The user deletes an application shared
		Given the user has "standard" plan
			And the user has an app
			And the user into the app has 1 "webform"
			And the user into the app has 1 "page"
			And the user into the app has 1 "workflow"
			And the user has an app shared
			And the user has login
		When the user is on the app dashboard
			And the user go to recived apps
			And the user clicks on the application menu
			And the user clicks on the delete option
			And the user accepts to delete the application
		Then the user should not have applications shared

	@installAppShared
	Scenario: The user installs an application shared with the quick access
		Given the user has "standard" plan
			And the user has an app
			And the user into the app has 1 "webform"
			And the user into the app has 1 "page"
			And the user into the app has 1 "workflow"
			And the user has an app shared
			And the user has login
		When the user is on the app dashboard
			And the user go to recived apps
			And the user clicks on the application menu
			And the user clicks on install option
			And the user go to the app dashboard
		# Then the application installed notify should be displayed
		Then there should be 2 applications installed