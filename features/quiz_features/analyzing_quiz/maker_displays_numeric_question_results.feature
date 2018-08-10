@analyticQ @airwaves @todo @quiz @quizAnalyzing

Feature: Applying a filter to numeric question results in quiz

	As an user
	I want see the results of a numeric question
	In order to analyse them by looking at the charts

	Scenario Outline: The user filters the results of a numeric question with <numAnswers> answers
		Given that there is a webform app with a qrvey with a numeric question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the "<filteredAnswer>" answer
			And the user clicks on the "filters" "button"
		Then the first answer filter should appear in the histogram filters
			And the number answers should be more than 0
			And the percentages of the answers should be 100

		Examples:
			| numAnswers | filteredAnswer |
			|     4      |       10       |
			|     5      |       20       |
			|     8      |       30       |
			|     13     |       70       |
			|     21     |       90       |

	Scenario Outline: The user filters the results of a numeric question with <numAnswers> answers
		Given that there is a webform app with a qrvey with a currency numeric question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the numeric qrvey results
			And the user clicks on the "filters" "button"
			And the user clicks on the "<filteredAnswer>" answer
		Then the first answer filter should appear in the histogram filters
			And the number answers should be more than 0
			And the percentages of the answers should be 100

		Examples:
			| numAnswers | filteredAnswer |
			|     4      | Happy          |
			|     5      | Exited         |
			|     8      | Dull           |
			|     13     | Tired          |
			|     21     | Impassive      |

	Scenario Outline: The user filters the results by the different answers
		Given that there is a webform app with a qrvey with a percentage numeric question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the numeric qrvey results
			And the user clicks on the "filters" "button"
			And the user clicks on the "<filteredAnswer>" answer
		Then the first answer filter should appear in the histogram filters
			And the number answers should be more than 0
			And the percentages of the answers should be 100

		Examples:
			| numAnswers | filteredAnswer |
			|     4      | Happy          |
			|     5      | Exited         |
			|     8      | Dull           |
			|     13     | Tired          |
			|     21     | Impassive      |