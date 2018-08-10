@complete @making @date @survey @surveyMaking @surveyMakingDate

Feature: The user creates a date question in survey

	As an user
	I want to create a date question
	In order for users to answer

	@smokeTest4
	Scenario: The user creates date question type with standard plan
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "date" question type from the dropdown
		When the user writes the date question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates date question type in survey and with basic plan
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "date" question type from the dropdown
		When the user writes the date question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	@surveyMakingDateRange
	Scenario Outline: The user creates date question type with <rangeName> range and <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "date" question type from the dropdown
		When the user writes the date question
			And the user selects the "<rangeName>" range
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

		Examples:
			| planName	| rangeName |
			| basic    	| before    |
			| basic     | after     |
			| basic   	| between   |
			| standard 	| before    |
			| standard  | after     |
			| standard 	| between   |