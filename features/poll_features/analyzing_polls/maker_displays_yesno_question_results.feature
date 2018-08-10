@analiticQ @analyzing @todo @pollsAnalyze @polls @pollsAnalyzeYesNo

Feature: The user displays yes-no question results and filter a value on Audience Poll Analyze

	As an user
	I want see the results of a yes-no question on an Audience Poll
	In order to analyse and filter them by looking at the different predefined options that have been answered

	Scenario Outline: The user shows the results of an audience poll that has a yes-no question with <numAnswers> answers and filters them by different values
		Given that there is a webform app with a "polling" with a "yes-no" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the "<filteredAnswer>" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" is a yes no answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer | afterFilterAnswers |
			| 8          | Yes            | 7                  |
			| 13         | No             | 7                  |