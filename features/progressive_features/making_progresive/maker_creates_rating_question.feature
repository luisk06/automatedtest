@todo @making @rating @progressive

Feature: The user creates a rating question qrvey

	As an user
	I want to create a rating question
	In order for users to answer

	Scenario: The user creates Rating question type
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "rating" question type from the dropdown
		When the user writes the Rating question
			And the user clicks outside the section box
		Then the question is saved