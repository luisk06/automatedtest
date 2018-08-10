@analyticQ @analyzing @analyzingProgressiveExpression @todo @progressiveAnalyze

Feature: The user displays expression question results in progressive

	As an user
	I want see the results of an expression question
	In order to analyse them

	Scenario Outline: The user filters the results of expression question with <numAnswers> answers in progressive
		Given that there is a webform app with a "progressive" with a "expression" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the expression answer "<filteredAnswer>"
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" expression answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer | afterFilterAnswers |
			| 4          | Happy          | 2                  |
			| 5          | Exited         | 2                  |
			| 8          | Dull           | 4                  |
			| 13         | Tired          | 5                  |
			| 21         | Impassive      | 7                  |