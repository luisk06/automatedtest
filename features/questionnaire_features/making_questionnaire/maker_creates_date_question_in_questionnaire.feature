@todo @deprecated @making @date @questionnaire @questionnaireMaking

Feature: The user creates a date question in questionnaire

	As an user
	I want to create a date question
	In order for users to answer

	Scenario: The user creates date question type in questionnaire
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "questionnaire"
			And that the user selects "date" question type from the dropdown
		When the user writes the date question
			And the user clicks outside the section box
		Then the question is saved

	@questionnaireMakingDateRange
	Scenario Outline: The user creates date question type in questionnaire with <rangeName> range and basic plan
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "questionnaire"
			And that the user selects "date" question type from the dropdown
		When the user writes the date question
			And the user selects the "<rangeName>" range
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| rangeName |
			| before    |
			| after     |
			| between   |