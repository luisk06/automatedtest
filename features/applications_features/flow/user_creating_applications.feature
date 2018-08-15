@complete @plans @firstUse @applications @unitTestsApp

Feature: Creating webforms regarding the user's plan

	As an user
	I must be enabled to create aplications
	In order to tests the new flow based on plans

	Scenario Outline: The user should be able to create <typeOfWebform> with the <planName> plan
		Given the user has "<planName>" plan
			And the user has login
		When the user clicks on the create aplication buttton
			And the user types the aplication name
			And the user types the aplication description
			And the user clicks on the next button
			And the user clicks on the "webform" option in apps
			And the user clicks on the new app
			And the user clicks on the "webforms" navbar option
			And the user clicks on the create "<typeOfWebform>" scratch button in the first use
		Then the user must be into the "webform" builder of "<typeOfWebform>"

		Examples:
			| planName | typeOfWebform |
			| basic    | forms 		   |
			| basic    | checklist 	   |
			| basic    | survey 	   |
			| basic    | nps 		   |
			| basic    | quiz 		   |
			| standard | forms 		   |
			| standard | checklist 	   |
			| standard | survey 	   |
			| standard | nps 		   |
			| standard | quiz 		   |