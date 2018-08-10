@complete @making @dropdown @forms @formsMaking @formsMakingDropdown

Feature: The user creates a dropdown question in forms

	As an user
	I want to create a dropdown question
	In order for users to answer

	Scenario: The user creates dropdown question type
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "dropdown" question type from the dropdown
		When the user writes the title of question
			And the user writes the options to "dropdown" question with 9 options
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly