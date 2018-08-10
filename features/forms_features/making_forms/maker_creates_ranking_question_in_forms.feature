@complete @making @ranking @forms @smokeTest2 @formsMaking

Feature: The user creates a ranking question in forms

	As an user
	I want to create a ranking question
	In order for users to answer

	Scenario: The user creates a ranking question type
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "ranking" question type from the dropdown
		When the user writes the Ranking question and options
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user creates a ranking question type
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "ranking" question type from the dropdown
		When the user writes the Ranking question and options
			And the user clicks outside the section box
		Then the question is saved