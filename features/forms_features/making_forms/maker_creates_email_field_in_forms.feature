@complete @making @email @forms @formsMaking

Feature: The user creates an email question in forms

	As an user
	I want to create a email question
	In order for users to answer

	Scenario: The user creates an email question type in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "email" question type from the dropdown
		When the user writes the title of question
			And the user clicks outside the section box
		Then the question is saved