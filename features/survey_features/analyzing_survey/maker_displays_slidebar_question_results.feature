@analiticQ @analyzing @survey @complete @surveyAnalyzing

Feature: Applying filters to a slidebar question results in survey summary view

	As an user
	I want see the results of a slidebar question
	In order to analyse them and see which option has the more stars

	@analyzingSlidebarQuestionResults
	Scenario Outline: The user filters the results of a slidebar question in survey by num stops with <numAnswers> answers
		Given that there is a webform app with a "survey" with a slidebar question that has <numStops> stops and <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user closes the histogram
			And the user clicks on the filter button
			And the user clicks on the <filteredAnswer> filter as bar in a "slidebar" question
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the <filteredAnswer> is a slidebar answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers  | numStops | filteredAnswer |
			| 8           | 3        | 1              |
			| 13          | 3        | 2              |