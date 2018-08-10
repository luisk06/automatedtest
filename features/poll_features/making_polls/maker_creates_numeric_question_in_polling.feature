@todo @pollsCreates @polls @making @numeric

Feature: The user creates numeric question in polling

	As an user
	I should creates numeric question in polling
	In order to share

	Scenario Outline: The user creates a numeric question with <optionName> option in polling
		Given the user has an app called "Test User Audience Poll"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user selects "polling" question type from the dropdown
		When the user clicks Create Quick "Polling" button
			And the user writes the "<name>" as "name" in "polling" type of qrvey
			And the user writes the "<description>" as "description" in "polling" type of qrvey
			And the user selects "numeric" question type from the dropdown menu
			And the user writes the numeric question and options
			And the user actives the "<optionName>" option
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| name                             | description                               | optionName |
			| Polling Question with general    | The user creates a numeric question type | general    |
			| Polling Question with number     | The user creates a numeric question type | number     |
			| Polling Question with currency   | The user creates a numeric question type | currency   |
			| Polling Question with percentage | The user creates a numeric question type | percentage |