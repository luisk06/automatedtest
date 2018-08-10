@todo @deprecated @making @yes-no @questionnaire @questionnaireMaking

Feature: The user creates a yes no question in questionnaire

	As an user
	I want to create a yes no choice question
	In order for users to answer

	@yesNoMakingQuestionnaire
	Scenario: The user creates yes no question type
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "questionnaire"
			And that the user selects "yes-no" question type from the dropdown
		When the user writes the question
			And the user clicks outside the section box
		Then the question is saved