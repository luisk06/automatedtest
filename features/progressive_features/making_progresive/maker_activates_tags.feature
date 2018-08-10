@todo @making @tags @progressive

Feature: The user activates tags

	As an user
	I want to add tags
	In order to make references in the next question

	Scenario: The user adds tags to multiple choice question
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user adds a multiple choice question
		When the user writes the question and answers
			And writes a tag for the question
		Then the tag should be displayed in the question