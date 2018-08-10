@complete @making @numeric @quiz @quizMaking @quizMakingNumeric

Feature: The user creates a numeric question in quiz

	As an user
	I want to create a numeric question
	In order for users to answer

	Scenario: The user creates a numeric question type
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user selects "numeric" question type from the dropdown
		When the user writes the numeric question and options
			And the user clicks outside the section box
		Then the question is saved