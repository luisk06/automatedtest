@analiticQ @analyzing @survey @complete @analyzingRankingResults @surveyAnalyzing

Feature: Applying filters to a ranking question results in survey summary view

	As an user
	I want see the results of a ranking question
	In order to analyse them by looking at the charts

	Scenario Outline: The user filters the results of a ranking question in survey with <numAnswers> answers and selects the cell <cell>
		Given that there is a webform app with a "survey" with a "ranking" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user closes the histogram
			And the user clicks on the filter button
			And the user clicks on the cell <cell>
			And the user clicks on the "apply_filter" "button"
			And the user opens the filterbar
		Then the <cell> ranking answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers  | cell  |
			|     1       |  0,0  |
			|     10      |  0,1  |
			|     15      |  0,2  |
			|     5       |  0,3  |
			|     8       |  1,1  |
			|     13      |  1,2  |
			|     21      |  1,3  |
			|     55      |  2,2  |
			|     89      |  2,3  |
			|     144     |  3,3  |