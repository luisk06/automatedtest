@publicResults @qrvey @todo @progressivePublicResults

Feature: The user displays the results of the taken progressive

	I want to display the results of the qrvey I just took
	In order to see the public answers.

	Scenario Outline: The user displays public results of a Progressive with a <typeOfQuestion> question with <numAnswers> answers
		Given that there is a webform app with a "progressive" with a "<typeOfQuestion>" question that has <numAnswers> answers
		When the user access public results URL
		Then the analytiq chart for "<typeOfQuestion>" question on detailed view should be displayed
			And the number answers should be exactly 0

		Examples:
			| typeOfQuestion  | numAnswers |
			| multiple choice | 21         |
			| numeric         | 21         |
			| expression      | 21         |
			| ranking         | 21         |
			| short text      | 21         |
			| long text       | 21         |
			| rating          | 21         |
			| image           | 21         |
			| slidebar        | 21         |
			| yes-no          | 21         |

	Scenario: The user displays public results of a Progressive with a date question with <numAnswers> answers
		Given that there is a webform app with a "progressive" with a date question that has 21 answers with the following dates:
			 | dates    |
			 | 01/01/01 |
			 | 02/02/02 |
			 | 03/03/03 |
			 | 04/04/04 |
			 | 05/05/05 |
		When the user access public results URL
		Then the analytiq chart for "date" question on detailed view should be displayed
			And the number answers should be exactly 0