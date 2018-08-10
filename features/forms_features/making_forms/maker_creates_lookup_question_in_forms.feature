@todo @making @lookup @forms @formsMaking

Feature: The user creates a lookup question in forms

	As an user
	I want to create a lookup question
	in order for users to see a question with multiple answer to choose from.

	Scenario: The user creates a lookup question with qrvey apps option on forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "look up" question type from the dropdown
			And the user writes the title of question
		When the user selects "qrvey-apps" from lookup dropdown
			And the user selects "form" like an app type from the dropdown
			And the user selects the form from the dropdown
			And the user selects the columm to show
			And the user selects the value to show
			And the user clicks on the Save button
		Then the question should be saved
			And the alert should not be displayed
			And the user shoud be able to move to share tab

	@smokeTest
	Scenario: The user creates a lookup question with copy paste option selected on forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "look up" question type from the dropdown
		When the user selects "copy-paste" from lookup dropdown
			And the user fills "Test lookup" as question title
			And the user fills the lookup copy paste options
			And the user clicks outside the section box
		Then the question should be saved
			And the alert should not be displayed
			And the user shoud be able to move to share tab

	@lookupSpreadsheet @testOne
	Scenario: The user creates a lookup question with google-spreadsheet option selected on forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "look up" question type from the dropdown
		When the user selects "google-spreadsheet" from lookup dropdown
			And the user fills "Test lookup" as question title
			And the user fills google-sheet url
			And the user clicks on select entries
			And the user fills google-sheet modal options
			And the user clicks the submit button
		Then the question should be saved
			And the numbers of rows should be 5
			And any of the cells should be empty
			And the alert should not be displayed
			And the user shoud be able to move to share tab

	Scenario: The user creates a lookup question with webhook option selected on forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "look up" question type from the dropdown
		When the user selects "webhook" from lookup dropdown
			And the user fills "Test lookup" as question title
			And the user fills webhook url
			And the user clicks on test
			And the user fills webhook options
			And the user clicks outside the section box
		Then the question should be saved
			And the numbers of rows should be 10
			And any of the cells should be empty
			And the alert should not be displayed
			And the user shoud be able to move to share tab