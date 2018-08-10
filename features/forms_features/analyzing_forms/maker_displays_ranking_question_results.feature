@analiticQ @analyzing @forms @complete @analyzingRankingResults @formsAnalyzing

Feature: Applying a filter to ranking question in forms summary view

	As an user
	I want see the results of a ranking question on summary view
	In order to analyse them by looking at the charts

	Scenario Outline: The user filters the results of a ranking question on summary view in forms with <numAnswers> answers and selects the cell <cell>
		Given that there is a webform app with a "forms" with a "ranking" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens the filter side bar
			And the user clicks on the filter button
			And the user clicks on the cell <cell>
			And the user clicks on the "apply_filter" "button"
		Then the <cell> ranking answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers  | cell  |
			|     1       |  0,0  |
			|     10      |  0,1  |
			|     5       |  0,3  |
			|     8       |  1,1  |
			|     21      |  1,3  |
			|     89      |  2,3  |
			|     144     |  3,3  |