@taking @complete @takingRanking @ranking @quiz @quizTaking @quizTakingRanking

Feature: Answering ranking question in quiz

	As as user
	I want to answer a ranking question
	In order to express my answer with a ranking question

	Scenario: The user answers ranking question with basic plan
		Given the user has "basic" plan
			And the user has an app
			And the user has a "quiz" with a "ranking" question
		When the user take the qrvey
			And the user clicks the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page