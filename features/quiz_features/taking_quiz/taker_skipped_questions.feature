@taking @todo @takingSkipped @skipped @quiz @quizTaking

Feature: Skipping all kind of questions in quiz

	As as user
	I want to skip any question
	In order to express my doubt with a question

	Scenario Outline: The user skip a <text> question with basic plan
		Given the user has "basic" plan
			And the user has an app
			And the user has a "quiz" with a "<question>" question
		When the user take the qrvey
			And the user skip the answer
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page

		Examples:
			| text 	  	  | question                    |
			| short text  | short_text_case_sensitive   |