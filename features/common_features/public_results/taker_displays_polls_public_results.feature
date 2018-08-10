@publicResults @qrvey @todo @pollingPublicResults

Feature: The user displays the results of the taken polling

	I want to display the results of the qrvey I just took
	In order to see the public answers.

	Scenario Outline: The user displays public results of a Audience Poll with a <typeOfQuestion> question with <numAnswers> answers
		Given that there is a webform app with a "polling" with a "<typeOfQuestion>" question that has <numAnswers> answers
		When the user access public results URL
		Then the analytiq chart for "<typeOfQuestion>" question on detailed view should be displayed
			And the number answers should be exactly 0

		Examples:
			| typeOfQuestion  | numAnswers |
			| multiple choice | 32         |
			| numeric         | 32         |
			| expression      | 32         |
			| ranking         | 32         |
			| short text      | 32         |
			| rating          | 32         |
			| slidebar        | 32         |
			| yes-no          | 32         |