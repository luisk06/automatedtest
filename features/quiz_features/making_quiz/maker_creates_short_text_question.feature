@complete @making @shortText @quiz @quizMaking @quizMakingShortText

Feature: The user creates a short text question in quiz

	As an user
	I want to create a short text question
	In order for users to answer

	@shortTextMaking
	Scenario: The user creates a short text question
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user selects "short_text" question type from the dropdown
		When the user writes the question and answers of a "short_text" question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly