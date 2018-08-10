@todo @making @makingShortText @shortText @progressive

Feature: The user creates a short text question in progressive

	As an user
	I want to create a short text question
	In order for users to answer openly and without restrictions

	Scenario: The user creates Short Text question with less than 160 chars
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "short text" question type from the dropdown
		When the user writes the Short Text question with less than 160 chars
			And the user clicks outside the section box
		Then the Short Text question should be saved with the exact string the user wrote

	Scenario: The user creates Short Text question with more than 160 chars
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "short text" question type from the dropdown
		When the user writes the Short Text question with more than 160 chars
			And the user clicks outside the section box
		Then the Short Text question should be saved with the first 160 chars the user wrote