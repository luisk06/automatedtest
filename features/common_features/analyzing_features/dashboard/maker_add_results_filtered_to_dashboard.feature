@complete @analyticQ @dashboardAN @dashboardFilteredAN @analyzing

Feature:  Adding filtered question to favorites

	As an user
	I want add to dashboard the filtered results
	In order to analyze the answers

	Scenario Outline: The user adds a survey multiple choice question with a filter applied to favorites
		Given that there is a webform app with a "survey" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user clicks on the filter button
			And the user clicks on the "<filteredAnswer>" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user add the chart to dashboard
			And the user go to the analytic dashboard
		Then the chart of "multiple choice" should appear in the dashboard
			And the panel should mention filter applied

		Examples:
			| filteredAnswer     |
			| Jon Snow           |