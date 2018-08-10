@complete @checklist @checklistCreation @checklistMaking @making

Feature: The user creates a checklist type of survey

	As an user
	I should be able to create checklist surveys
	In order to share and collect answers

	@todo
	Scenario: The user tries to create checklist without name
		Given  the user has login
			And the user do clicks on Create New
			And that the user selects "checklist" question type from the dropdown
		When the user leave the "checklistName" input empty
			And the user clicks Create "Checklist" button
		Then An alert with text "Please enter name" should appear below "name" input

	@todo
	Scenario: The user re-enter name when it was left empty before
		Given the user has login
			And the user do clicks on Create New
			And that the user selects "checklist" question type from the dropdown
		When the user leave the "checklistName" input empty
			And the user clicks Create "Checklist" button
			And the user writes the "CheckList Test" as "name" in "checklist" type of qrvey
			And the user writes the "CheckList description" as "description" in "checklist" type of qrvey
			And the user clicks Create "Checklist" button
		Then The "CheckList Test" and "CheckList description" should appear on survey tittle

	Scenario: The user create a checklist
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
		When the user created the "checklist" with "CheckList Test" as title
		Then The "CheckList Test" and "CheckList description" should appear on survey tittle