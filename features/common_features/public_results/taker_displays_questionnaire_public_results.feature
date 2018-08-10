@todo @deprecated @publicResults @qrvey @complete @questionnairePublicResults

Feature: The user displays the public results of the taken in questionnaire

	I want to display the results of the qrvey I just took
	In order to see the public answers.

	Scenario Outline: The user displays public results of a Questionnaire with a <typeOfQuestion> question with <numAnswers> answers
		Given that there is a webform app with a "questionnaire" with a "<typeOfQuestion>" question that has <numAnswers> answers
		When the user access public results URL
		Then the analytiq chart for "<typeOfQuestion>" question on tabular view should be displayed
			And the total of rows on table should be <numAnswers>

		Examples:
			| typeOfQuestion  | numAnswers |
			| multiple choice | 32         |
			| numeric         | 32         |
			| email           | 32         |
			| address         | 32         |
			| short text      | 32         |
			| long text       | 32         |
			| us_address      | 32         |
			| phone           | 32         |
			| name            | 32         |
			| password        | 32         |
			| yes-no          | 32         |

	Scenario: The user displays public results of a Questionnaire with a date question with 32 answers
		Given that there is a webform app with a "questionnaire" with a date question that has 32 answers with the following dates:
			 | dates    |
			 | 01/01/01 |
			 | 02/02/02 |
			 | 03/03/03 |
			 | 04/04/04 |
			 | 05/05/05 |
		When the user access public results URL
		Then the analytiq chart for "date" question on tabular view should be displayed
			And the total of rows on table should be 32