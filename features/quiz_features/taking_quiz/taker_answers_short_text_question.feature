@taking @complete @takingShortText @shortText @quiz @quizTaking @quizTakingShortText

Feature: Answering short text question in quiz

	As as user
	I want to answer a short text question
	In order to express my answer with a short text question

	Scenario: The user answers short text question with basic plan
		Given the user has "basic" plan
			And the user has an app
			And the user has a "quiz" with a "short_text" question
		When the user take the qrvey
			And the user selects answers in "short_text" question
			And the user clicks the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page