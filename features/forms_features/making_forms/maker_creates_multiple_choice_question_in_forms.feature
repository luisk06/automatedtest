@complete @making @multipleChoice @forms @formsMaking

Feature: The user creates a multiple choice question in forms

	As an user
	I want to create a multiple choice question
	in order for users to see a question with multiple answer to choose from.

  	@smokeTest2
	Scenario: The user creates a multiple choice with nothing else selected in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user creates a multiple choice with Other option in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And clicks on the Other option field
		Then the question is saved

	Scenario: The user creates a multiple choice with Allow multiple selections in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And clicks on the Allow multiple selections checkbox
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user creates a multiple choice with Other option field and Allow multiple selections in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And clicks on the Other option field
			And Allow multiple selections checkboxes
			And the user clicks outside the section box
		Then the question is saved