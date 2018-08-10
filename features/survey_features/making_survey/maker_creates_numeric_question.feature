@complete @making @numeric @survey @makingNumeric @surveyMaking

Feature: The user creates a numeric question in survey

	As an user
	I want to create a numeric question
	In order for users to answer

	@smokeTest4
	Scenario: The user creates a numeric question type in survey and with standard plan
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "numeric" question type from the dropdown
		When the user writes the numeric question and options
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario Outline: The user creates a numeric question type with <typeOfOption> option in survey and with <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "numeric" question type from the dropdown
		When the user writes the numeric question and options
			And the user actives the "<typeOfOption>" option
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

		Examples:
			| planName	| typeOfOption 	|
			| basic    	| general    	|
			| basic     | number     	|
			| basic   	| currency   	|
			| basic 	| percentage 	|
			| standard  | general    	|
			| standard  | number     	|
			| standard  | currency   	|
			| standard 	| percentage 	|