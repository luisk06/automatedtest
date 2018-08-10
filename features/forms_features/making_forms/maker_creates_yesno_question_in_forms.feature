@complete @making @yes-no @forms @formsMaking

Feature: The user creates a yes no question in forms

	As an user
	I want to create a Yes/No choice question
	In order for users to answer

	@yesNoMakingforms
	Scenario: The user creates a yes no question type
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "yes-no" question type from the dropdown
		When the user writes the question
			And the user clicks outside the section box
		Then the question is saved