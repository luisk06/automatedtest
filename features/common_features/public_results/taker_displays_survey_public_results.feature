@publicResults @qrvey @complete @surveyPublicResults

Feature: Survey public results

 	I want to display the results of the qrvey I just took
 	In order to see the public answers.

	Scenario Outline: The user displays public results of a Survey with a <typeOfQuestion> question with <numAnswers> answers
		Given that there is a webform app with a "survey" with a "<typeOfQuestion>" question that has <numAnswers> answers
		When the user access public results URL
		Then the analytiq chart for "<typeOfQuestion>" question on detailed view should be displayed
			And the number answers should be exactly 32

		Examples:
			| typeOfQuestion  | numAnswers |
			| multiple choice | 32         |
			| numeric         | 32         |
			| expression      | 32         |
			| ranking         | 32         |
			| short text      | 32         |
			| long text       | 32         |
			| rating          | 32         |
			| image           | 32         |
			| slidebar        | 32         |
			| yes-no          | 32         |

	Scenario: The user displays public results of a Survey with a date question with <numAnswers> answers
		Given that there is a webform app with a "survey" with a date question that has 32 answers with the following dates:
			 | dates    |
			 | 01/01/01 |
			 | 02/02/02 |
			 | 03/03/03 |
			 | 04/04/04 |
			 | 05/05/05 |
		When the user access public results URL
		Then the analytiq chart for "date" question on detailed view should be displayed
			And the number answers should be exactly 32