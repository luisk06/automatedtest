@analiticQ @analyzing @todo @pollsAnalyze @polls @pollsAnalyzeNumeric

Feature: The user displays numeric question results and filter a value on Audience Poll Analyze

	As an user
	I want see the results of a numeric question on an Audience Poll
	In order to analyse and filter them by looking at the different predefined options that have been answered

	Scenario Outline: The user shows the results of an audience poll that has a numeric question with <numAnswers> answers and filters them by different values
		Given that there is a webform app with a "polling" with a "numeric" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the <positionAnswer> filter as bar in a "slidebar" question
			And the user clicks on the "apply_filter" "button"
		Then the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer | positionAnswer |
			|     4      |       10       | 1 			   |
			|     13     |       70       | 1 			   |
			|     21     |       90       | 1 			   |