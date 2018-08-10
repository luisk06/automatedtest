@todo @making @expression @progressive

Feature: The user creates a expression question

	As an user
	I want to create a expression question
	In order for users to answer with expressions

	Scenario: The user creates a expression question
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "expression" question type from the dropdown
		When the user writes the expression question title
			And the user writes the possible answers
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user creates a categories expression question
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "expression" question type from the dropdown
			And that the user marks the active categories checkbox
			And the positive and negative input field are displayed
		When the user writes the expression question title
			And writes the possible positive answers
			And writes the possible negative answers
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user writes autocompleted answers to a expression question
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "expression" question type from the dropdown
		When the user starts writing some possible answer
		Then the suggested expressions should be displayed