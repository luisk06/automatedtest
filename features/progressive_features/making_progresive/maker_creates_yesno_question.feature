@todo @making @yes-no @progressive

Feature: The user creates a yes no question in progressive

	As an user
	I want to create a Yes/No choice question
	In order for users to answer

	@yes-noMaking
	Scenario: The user creates yes no question type
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "yes-no" question type from the dropdown
		When the user writes the question
			And the user clicks outside the section box
		Then the question is saved