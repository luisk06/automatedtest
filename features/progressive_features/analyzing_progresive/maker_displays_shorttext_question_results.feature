@analiticQ @analyzing @todo @progressiveShortText @progressiveAnalyze

Feature: The user displays a short text question results

	As an user
	I want see the results of a short text question
	In order to analyse the open responses of the users

	Scenario Outline: The user filters the results of a short text question with <numAnswers> answers
		Given that there is a webform app with a "progressive" with a "short text" question that has <numAnswers> answers and <afterFilterAnswers> "<filteredAnswer>"
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user writes "<filteredAnswer>" in the "keyword" "input"
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" short text answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer | afterFilterAnswers |
			| 4          | jon            | 2                  |
			| 8          | brienne        | 3                  |
			| 13         | tyrion         | 6                  |
			| 21         | arya           | 10                 |
			| 55         | daenerys       | 5                  |
			| 89         | lannister      | 19                 |
			| 144        | stark          | 32                 |