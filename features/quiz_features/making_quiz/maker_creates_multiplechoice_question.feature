@complete @making @multipleChoice @quiz @quizMaking @quizMakingMultipleChoice

Feature: The user creates a multiple choice question in quiz

	As an user
	I want to create a multiple choice question
	in order for users to see a question with multiple answer to choose from.

	@smokeTest3
	Scenario: The user creates a multiple choice with nothing else selected
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user selects the right answer in a "multiple-choice" question
			And the user clicks outside the section box
		Then the question is saved