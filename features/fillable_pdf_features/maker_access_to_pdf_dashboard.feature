@complete @fillableTemplates @fillablePdf

Feature: The user creates fillables templates

	As an user
	I want to create a PDF based on PDF template
	In order for show any results

	Scenario: The user access to fillables templates dashboard
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opened his app on "config"
			And the clicks on settings tab
		When the user opened the manager files
		Then the user should stay on the manager files url
			And should not have pdf on the list