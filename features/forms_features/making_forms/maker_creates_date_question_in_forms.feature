@complete @making @date @forms @formsMaking @formsMakingDate

Feature: The user creates a date question in forms

	As an user
	I want to create a date question
	In order for users to answer

	Scenario Outline: The user creates a date question type in forms with <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "date" question type from the dropdown
		When the user writes the date question
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| planName 	|
			| standard 	|
			| basic 	|

	@formMakingDateRange
	Scenario Outline: The user creates a date question type in forms with <rangeName> range and <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "date" question type from the dropdown
		When the user writes the date question
			And the user selects the "<rangeName>" range
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| planName 	| rangeName |
			| standard 	| before    |
			| standard 	| after     |
			| standard 	| between   |
			| basic 	| before    |
			| basic 	| after     |
			| basic 	| between   |