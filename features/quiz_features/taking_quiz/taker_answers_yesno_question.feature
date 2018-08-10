@taking @complete @takingYesNo @yes-no @quiz @quizTaking

Feature: Answering yes no question in quiz

	As as user
	I want to answer a Yes/No question
	In order to express my answer with a yes no question

	Scenario Outline: The user answers yes no question and selects <text> option and with basic plan
		Given the user has "basic" plan
			And the user has an app
			And the user has a "quiz" with a "yes_no" question
		When the user take the qrvey
			And the user selects "<answers>" answers
			And the user clicks the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page

		Examples:
			| text | answers |
			| yes  | no      |
			| no   | yes     |