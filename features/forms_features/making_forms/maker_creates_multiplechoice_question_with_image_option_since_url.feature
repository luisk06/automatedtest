@complete @making @multipleChoice @forms @formsMaking @formsMakingMultipleChoice @imageOption

Feature: The user creates a multiple choice question with image option in forms

	As an user
	I want to create a multiple choice question
	in order for users to see a question with multiple answer to choose from

	Scenario: The user creates a multiple choice with image url option selected
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user click on add image option
			And the user add image option to "url"
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly