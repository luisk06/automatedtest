@complete @applications @tags @navbarLevel2

Feature: The user verify the urls in each section in the navbar of second level into an app

	As an user
	I write a long description

	Scenario Outline: the user verify that <pathUrl> section exists in <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user has click on his app
		When the user clicks on the "<pathUrl>" in menu second level
		Then the user should is on the "/<url>" url

		Examples:
			| pathUrl				| url					| planName	|
			| config				| config				| basic 	|
			| config				| config				| standard 	|
			| webforms				| webforms				| basic 	|