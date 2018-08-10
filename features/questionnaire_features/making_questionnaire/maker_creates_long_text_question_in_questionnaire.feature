@todo @deprecated @making @longText @questionnaire @questionnaireMaking

Feature: The user creates a long text question in questionnaire

	As an user
	I want to create a long text question
	In order for users to answer

	Scenario: The user creates a long text question in questionnaire
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "questionnaire"
			And that the user selects "long-text" question type from the dropdown
		When the user writes the title of question
			And the user clicks outside the section box
		Then the question is saved