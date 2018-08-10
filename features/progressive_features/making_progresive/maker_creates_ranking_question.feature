@todo @making @ranking @progressive

Feature: The user creates a ranking question qrvey

	As an user
	I want to create a ranking question
	In order for users to answer

	Scenario: The user creates Ranking question type
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "ranking" question type from the dropdown
		When the user writes the Ranking question and options
			And the user clicks outside the section box
		Then the question is saved