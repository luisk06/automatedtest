@complete @making @date @quiz @quizMaking @quizMakingDate

Feature: The user creates a date question in quiz

	As an user
	I want to create a date question
	In order for users to answer

	Scenario: The user creates date question type
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user selects "date" question type from the dropdown
		When the user writes the date question
			And the user clicks outside the section box
		Then the question is saved