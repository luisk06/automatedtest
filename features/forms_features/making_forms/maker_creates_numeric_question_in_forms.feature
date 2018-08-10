@complete @making @numeric @forms @formsMaking

Feature: The user creates a numeric question in forms

	As an user
	I want to create a numeric question
	In order for users to answer

	Scenario Outline: The user creates a numeric question type in forms with <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "numeric" question type from the dropdown
		When the user writes the numeric question and options
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| planName 	|
			| standard 	|
			| basic 	|

	Scenario Outline: The user creates a numeric question type with <typeOfOption> option in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "numeric" question type from the dropdown
		When the user writes the numeric question and options
			And the user actives the "<typeOfOption>" option
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| planName 	| typeOfOption  |
			| standard 	| general    	|
			| standard 	| number     	|
			| standard 	| currency   	|
			| standard 	| percentage 	|
			| basic 	| general    	|
			| basic 	| number     	|
			| basic 	| currency   	|
			| basic 	| percentage 	|