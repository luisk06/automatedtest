@complete @taking @quiz @quizTaking @quizTakingScore @all

Feature: The user answers the managed score option in quiz

	As an user
	I want to answer some questions
	In order to know if were managed the score option

	Scenario: The user answers a quiz with all right and show the results
		Given the user has an app
			And the user has a "quiz" with some questions
				| questionTypes   |
				| yes_no          |
				| multiple_choice |
				| date            |
				# | numeric       |
				# | yes_no        |
			And the user shows the results at the end of the quiz
			And the user passed 3 points as score
			And the user activated the webform
		When the user take the qrvey
			And the user choose the right answers
		Then the user should jump to the finished quiz page
			And the scoreboard should be displayed
			And the user should passed the quiz
			And the success message should be displayed on the quiz

	Scenario: The user answers a quiz with all right and hide the results
		Given the user has an app
			And the user has a "quiz" with some questions
				| questionTypes   |
				| yes_no          |
				| multiple_choice |
				| date            |
			And the user hides the results at the end of the quiz
			And the user passed 2 points as score
			And the user activated the webform
		When the user take the qrvey
			And the user choose the right answers
		Then the user should jump to the finished quiz page
			And the scoreboard should not be displayed
			And the success message should be displayed on the quiz

	Scenario: The user answers a quiz with wrong answers and show the results
		Given the user has an app
			And the user has a "quiz" with some questions
				| questionTypes   |
				| yes_no          |
				| multiple_choice |
				| date            |
			And the user shows the results at the end of the quiz
			And the user passed 3 points as score
			And the user activated the webform
		When the user take the qrvey
			And the user choose the answers
		Then the user should jump to the finished quiz page
			And the scoreboard should be displayed
			And the message should be displayed on the quiz

	Scenario: The user answers a quiz with wrong answers and hide the results
		Given the user has an app
			And the user has a "quiz" with some questions
				| questionTypes   |
				| yes_no          |
				| multiple_choice |
				| date            |
			And the user hides the results at the end of the quiz
			And the user passed 2 points as score
			And the user activated the webform
		When the user take the qrvey
			And the user choose the answers
		Then the user should jump to the finished quiz page
			And the scoreboard should not be displayed
			And the message should be displayed on the quiz