@analiticQ @analyzing @survey @complete @surveyShortText @surveyAnalyzing

Feature: Applying filters to a short text question results in survey summary view

	As an user
	I want see the results of a short text question
	In order to analyse the open responses of the users

	Scenario Outline: The user filters the results of a short text question in survey with <numAnswers> answers
		Given that there is a webform app with a "survey" with a "short text" question that has <numAnswers> answers and 1 "<filteredAnswer>"
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user closes the histogram
			And the user clicks on the filter button
			And the user writes "<filteredAnswer>" in the "keyword" "input"
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" short text answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer |
			| 4          | jon            |
			| 5          | targaryen      |
			| 8          | brienne        |
			| 13         | tyrion         |
			| 21         | arya           |
			| 55         | daenerys       |
			| 89         | lannister      |
			| 144        | stark          |