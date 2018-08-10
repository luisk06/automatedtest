@todo @deprecated @making @lookup @questionnaire @questionnaireMaking @questionnaireMakingLookup

Feature: The user creates look up question in questionnaire

	As an user
	I want to create a lookup question
	in order for users to see a question with multiple answer to choose from.

	Background:
		Given the user has an app
			And the user has login

	@smokeTest
	Scenario: The user creates lookup question with copy paste option selected on questionnaire
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "questionnaire" with "Test Lookup copy-paste" as tittle
			And that the user selects "look up" question type from the dropdown
		When the user selects "copy-paste" from lookup dropdown
			And the user fills "Test lookup" as question title
			And the user fills the lookup copy paste options
			And the user clicks outside the section box
		Then the question should be saved
			And the user shoud be able to move to share tab

	Scenario: The user creates lookup question with google-spreadsheet option selected on questionnaire
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "questionnaire" with "Test Lookup google-sheet" as tittle
			And that the user selects "look up" question type from the dropdown
		When the user selects "google-spreadsheet" from lookup dropdown
			And the user fills "Test lookup" as question title
			And the user fills google-sheet url
			And the user clicks on select entries
			And the user fills google-sheet modal options
			And the user clicks the submit button
		Then the numbers of rows should be 5
			And any of the cells should be empty
			And the user shoud be able to move to share tab

	Scenario: The user creates lookup question with webhook option selected on questionnaire
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "questionnaire" with "Test Lookup webhook" as tittle
			And that the user selects "look up" question type from the dropdown
		When the user selects "webhook" from lookup dropdown
			And the user fills "Test lookup" as question title
			And the user fills webhook url
			And the user clicks on test
			And the user fills webhook options
			And the user clicks outside the section box
		Then the numbers of rows should be 10
			And any of the cells should be empty
			And the user shoud be able to move to share tab