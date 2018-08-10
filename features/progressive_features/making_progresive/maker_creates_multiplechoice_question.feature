@todo @making @multipleChoice @progressive

Feature: The user creates multiple choice question in progressive

	As an user
	I want to create a multiple choice question
	in order for users to see a question with multiple answer to choose from.

	@smokeTest
	Scenario: The user creates multiple choice with nothing else selected
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user creates multiple choice with Other option
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And clicks on the Other option field
		Then the question is saved

	Scenario: The user creates multiple choice with Allow multiple selections
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And clicks on the Allow multiple selections checkbox
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user creates multiple choice with Other option field and Allow multiple selections
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And clicks on the Other option field
			And Allow multiple selections checkboxes
			And the user clicks outside the section box
		Then the question is saved