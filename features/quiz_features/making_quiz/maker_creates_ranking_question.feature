@complete @making @ranking @quiz @quizMaking @quizMakingRanking

Feature: The user creates a ranking question in quiz

	As an user
	I want to create a ranking question
	In order for users to answer

	@rankingMaking
	Scenario: The user creates a ranking question
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user selects "ranking" question type from the dropdown
		When the user writes the question and answers of a "ranking" question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly