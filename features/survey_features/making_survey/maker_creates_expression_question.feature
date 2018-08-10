@complete @making @expression @survey @surveyMaking @surveyMakingExpression

Feature: The user creates an expression question in survey

	As an user
	I want to create an expression question
	In order for users to answer with expressions

	@smokeTest4
	Scenario: The user creates an expression question with basic plan
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "expression" question type from the dropdown
		When the user writes the expression question title
			And the user writes the possible answers
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a categories expression question with basic plan
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "expression" question type from the dropdown
			And that the user marks the active categories checkbox
			And the positive and negative input field are displayed
		When the user writes the expression question title
			And writes the possible positive answers
			And writes the possible negative answers
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates an expression question with standard plan
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "expression" question type from the dropdown
		When the user writes the expression question title
			And the user writes the possible answers
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a categories expression question with standard plan
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "expression" question type from the dropdown
			And that the user marks the active categories checkbox
			And the positive and negative input field are displayed
		When the user writes the expression question title
			And writes the possible positive answers
			And writes the possible negative answers
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly