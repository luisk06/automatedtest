@complete @taking @date @quiz @quizTaking @quizTankingDate

Feature: Answering date question in quiz

	As as user
	I want to answer a date question
	In order to express my answer with a specific date

	Scenario: The user answers the date question
		Given the user has an app
			And the user has a "quiz" with a "date" question
		When the user take the qrvey
			And the user selects the date
			And the user removes the datepicker thats blocking the Ok button
			And the user clicks the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page