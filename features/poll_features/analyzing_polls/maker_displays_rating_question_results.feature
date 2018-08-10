@analiticQ @analyzing @todo @pollsAnalyze @polls @pollsAnalyzeRating

Feature: The user displays rating question results and filter a value on Audience Poll Analyze

	As an user
	I want see the results of a rating question on an Audience Poll
	In order to analyse and filter them by looking at the different predefined options that have been answered

	Scenario Outline: The user shows the results of an audience poll that has a rating question with <numAnswers> answers and filters them by different values
		Given that there is a webform app with a "polling" with a "rating" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the <filteredAnswer> filter as bar in a "slidebar" question
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer | afterFilter |
			|     21     |      1         | 7           |
			|     34     |      2         | 8           |
			|     55     |      3         | 11          |