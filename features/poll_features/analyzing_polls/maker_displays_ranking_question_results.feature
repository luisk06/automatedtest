@analiticQ @analyzing @todo @pollsAnalyze @polls @pollsAnalyzeRanking

Feature: The user displays ranking question results and filter a value on Audience Poll Analyze

	As an user
	I want see the results of a ranking question on an Audience Poll
	In order to analyse and filter them by looking at the different predefined options that have been answered

	Scenario Outline: The user shows the results of an audience poll that has a ranking question with <numAnswers> answers and filters them by different values
		Given that there is a webform app with a "polling" with a "ranking" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the cell <cell>
			And the user clicks on the "apply_filter" "button"
		Then the <cell> ranking answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers  | cell  | afterFilterAnswers |
			|     5       |  0,3  | 1                  |
			|     8       |  1,1  | 0                  |
			|     13      |  1,2  | 3                  |
			|     21      |  1,3  | 4                  |
			|     55      |  2,2  | 11                 |