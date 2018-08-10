@complete @making @phone @forms @formsMaking

Feature: The user creates a phone question in forms

	As an user
	I want to create a phone question
	In order for users to answer

	Scenario: The user creates a phone question type in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "phone" question type from the dropdown
		When the user writes the title of question
			And the user clicks outside the section box
		Then the question is saved