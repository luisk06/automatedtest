@analiticQ @analyzing @todo @analyzingRankingResults @progressiveAnalyze

Feature: The user displays ranking question results in progressive

	As an user
	I want see the results of a ranking question
	In order to analyse them by looking at the charts

	Scenario Outline: The user filters the results of a ranking question with <numAnswers> answers in progressive
		Given that there is a webform app with a "progressive" with a "ranking" question that has <numAnswers> answers
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
			|     1       |  0,0  | 1                  |
			|     2       |  0,1  | 0                  |
			|     3       |  0,2  | 0                  |
			|     5       |  0,3  | 1                  |
			|     8       |  1,1  | 0                  |
			|     13      |  1,2  | 3                  |
			|     21      |  1,3  | 4                  |
			|     55      |  2,2  | 11                 |
			|     89      |  2,3  | 18                 |
			|     144     |  3,3  | 60                 |