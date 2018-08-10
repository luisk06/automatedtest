@complete @applications @configApp @firstUse

Feature: Changing application settings

	As an user
	I must be enabled to change the configure
	In order to customize your apps

	Scenario Outline: A user should be able to modify application settings with <plan> plan
		Given the user has "<plan>" plan
			And the user has an app
			And the user has the deafult configure
			And the user has login
			And the user opened his app on "config"
			And the clicks on settings tab
		When the user write the name and description app
			And the user upload the logo app
			And the user clicks on the settings tab
			And the user selects the "<typeTheme>" theme
		Then the configuration should be saved automatically

		Examples:
		| plan 		| sizeFont 	| typeFont   | typeTheme |
		| standard 	| small 	| serif   	 | dark 	 |
		| standard 	| medium 	| sans_serif | light 	 |
		| standard 	| large 	| serif		 | dark 	 |
		| basic 	| small 	| serif   	 | dark 	 |
		| basic 	| medium 	| sans_serif | light 	 |
		| basic 	| large 	| serif		 | dark 	 |