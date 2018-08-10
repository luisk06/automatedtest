@analiticQ @complete @analyzing @forms @rating @analyzingRatingResults @formsAnalyzing

Feature: Applying a filter to rating question in forms summary view

	As an user
	I want see the results of a rating question
	In order to analyse them and see which option has the more stars

	Scenario Outline: The user filters the results by <filteredAnswer> option with <numAnswers> answers in forms
		Given that there is a webform app with a "forms" with a "rating" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user clicks on the filter button
			And the user clicks on the <filteredAnswer> filter as bar in a "slidebar" question
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer |
			|     21     |      1         |
			|     34     |      2         |
			|     55     |      3         |
			|     89     |      4         |
			|     144    |      5         |