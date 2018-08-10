@analiticQ @analyzing @todo @pollsAnalyze @polls @pollsAnalyzeSlidebar

Feature: The user displays slidebar question results and filter a value on Audience Poll Analyze

	As an user
	I want see the results of a slidebar question on an Audience Poll
	In order to analyse and filter them by looking at the different predefined options that have been answered

	@analyzingSlidebarQuestionResults
	Scenario Outline: The user shows the results of an audience poll that has a slidebar question with <numAnswers> answers and filters them by different values
		Given that there is a webform app with a "polling" with a slidebar question that has <numStops> stops and <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the <filteredAnswer> filter as bar in a "slidebar" question
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the <filteredAnswer> is a slidebar answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers  | numStops | filteredAnswer | afterFilterAnswers |
			| 8           | 3        | 1              | 2                  |
			| 13          | 3        | 2              | 1                  |