@todo @pollsCreates @polls @making

Feature: The user creates slider bar question in polling

	As an user
	I should creates slider bar question in polling
	In order to share

	Scenario Outline: The user creates a slider bar question with <slideStep> steps in polling
		Given the user has an app called "Test User Audience Poll"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user selects "polling" question type from the dropdown
		When the user clicks Create Quick "Polling" button
			And the user writes the "Polling Question Slidebar" as "name" in "polling" type of qrvey
			And the user writes the "The user creates a polling question" as "description" in "polling" type of qrvey
			And the user selects "slider bar" question type from the dropdown menu
		When the user writes the slidebar question
			And selects the number <slideStep>
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| slideStep |
			| 3         |
			| 5         |
			| 7         |
			| 9         |