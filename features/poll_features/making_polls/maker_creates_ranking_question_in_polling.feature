@todo @pollsCreates @polls @making

Feature: The user creates ranking question in polling

	As an user
	I should creates ranking question in polling
	In order to share

	Scenario: The user creates a ranking question in polling
		Given the user has an app called "Test User Audience Poll"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user selects "polling" question type from the dropdown
		When the user clicks Create Quick "Polling" button
			And the user writes the "Polling Question" as "name" in "polling" type of qrvey
			And the user writes the "The user creates a ranking question type" as "description" in "polling" type of qrvey
			And the user selects "ranking" question type from the dropdown menu
			And the user writes the Ranking question and options
			And the user clicks outside the section box
		Then the question is saved