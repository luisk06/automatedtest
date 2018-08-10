@analyticQ @analyzing @survey @analyzingExpression @complete @surveyAnalyzing

Feature: Applying filters to a expression question results in survey summary view

	As an user
	I want see the results of an expression question
	In order to analyse them

	Scenario Outline: The user filters the results of a expression in survey with <numAnswers> answers
		Given that there is a webform app with a "survey" with a "expression" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user closes the histogram
			And the user clicks on the filter button
			And the user clicks on the expression answer "<filteredAnswer>"
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" expression answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer |
			| 4          | Happy          |
			| 5          | Exited         |
			| 8          | Dull           |
			| 13         | Tired          |
			| 21         | Impassive      |