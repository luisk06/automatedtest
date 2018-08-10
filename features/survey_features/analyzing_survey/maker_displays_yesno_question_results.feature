@analiticQ @analyzing @complete @survey @smokeTest3 @surveyAnalyzing

Feature: Applying filters to a yes no question results in survey summary view

	As an user
	I want see the results of a yes no question
	In order to analyse them by looking at the different predefined options that have been answered

	@analyzingYesNoQuestionResults
	Scenario Outline: The user filters the results of a yes no question in survey with <numAnswers> answers where selects <filteredAnswer>
		Given that there is a webform app with a "survey" with a "yes-no" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user closes the histogram
			And the user clicks on the filter button
			And the user clicks on the "<filteredAnswer>" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" is a yes no answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer |
			| 8          | Yes            |
			| 13         | No             |