@complete @taking @multipleChoice @quiz @quizTaking @quizTakingMultipleChoice

Feature: Answering multiple choice question in quiz

	As as user
	I want to answer a qrvey with a multiple choice question
	in order to express answer with predefined options

	@smokeTest3
	Scenario: The user answers multiple choice question
		Given the user has an app
			And the user has a "quiz" with a "multiple_choice" question
		When the user take the qrvey
			And the user selects the desired answer choice
			And clicks on the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page