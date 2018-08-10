@complete @making @usAddress @forms @formsMaking

Feature: The user creates a US address question in forms

	As an user
	I want to create a us address question
	In order for users to answer

	Scenario: The user creates a US address question type in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "us-address" question type from the dropdown
		When the user writes the title of question
			And the user clicks outside the section box
		Then the question is saved