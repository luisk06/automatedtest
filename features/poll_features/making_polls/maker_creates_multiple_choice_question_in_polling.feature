@todo @pollsCreates @polls @making

Feature: The user creates multiple choice question in polling

	As an user
	I should creates multiple choice question in polling
	In order to share

	@smokeTest
	Scenario: The user creates a multiple choice with nothing else selected in polling
		Given the user has an app called "Test User Audience Poll"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user selects "polling" question type from the dropdown
		When the user clicks Create Quick "Polling" button
			And the user writes the "Polling Question" as "name" in "polling" type of qrvey
			And the user writes the "The user creates a polling question" as "description" in "polling" type of qrvey
			And the user selects "multiple choice" question type from the dropdown menu
		When the user writes the question and answers
			And the user clicks outside the section box
		Then the question is saved