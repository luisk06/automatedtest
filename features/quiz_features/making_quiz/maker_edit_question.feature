@complete @making @edit_questions @quiz @quizMaking @quizMakingEditQuestion

Feature: The user edit questions in quiz

	As an user
	I want to be able to edit questions
	from my qrvey

	Scenario: The user edit questions in quiz
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user has added questions and wants to edit them
		When the question turns to edit mode
		Then the user will be able to edit the content of the question
			And the question is saved