@analyticQ @complete @survey @analyzingSurveyNumeric @surveyAnalyzing

Feature: Applying filters to a numeric question results in survey summary view

	As an user
	I want see the results of a numeric question
	In order to analyse them by looking at the charts

	Scenario Outline: The user applies a <filterType> filter to numeric question in survey summary view
		Given that there is a webform app with a "survey" with a "numeric" question that has 20 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user closes the histogram
			And the user clicks on the filter button
			And the user picks "<filterType>" from "numeric-filter" dropdown
			And the user type <filteredAnswer> on "numeric-value" input
			And the user clicks on add filter button
			And the user clicks on the "apply_filter" "button"
			And the user opens the filter side bar
		Then the number answers should be more than 0
			And "<filteredAnswer>" answer should be contained in histogram filters
			And "<filterText>" answer should be contained in histogram filters

		Examples:
			| filteredAnswer|	filterType		|	filterText	|
			|	2			|	Equal 			|	Equal		|
			|	15			|	Does Not equal	|	Not Equals	|
			|	1			|	Greater than	|	Greater Than|
			|	60			|	Less than		|	Less Than	|

	Scenario: The user applies a Between filter to numeric question in survey summary view
	Given that there is a webform app with a "survey" with a "numeric" question that has 20 answers
		And the user is logged in
		And the user opens the just created app
		And the user opens the "webform" board
	When the user clicks on the "qrvey_results" "button" of the just created qrvey
		And the user go to the Summary View
		And the user closes the histogram
		And the user clicks on the filter button
		And the user picks "Between" from "numeric-filter" dropdown
		And the user type 2 on "numeric-minimum" input
		And the user type 20 on "numeric-maximum" input
		And the user clicks on add filter button
		And the user clicks on the "apply_filter" "button"
		And the user opens the filter side bar
	Then the number answers should be more than 0
		And "2 - 20" answer should be contained in histogram filters
		And "Between" answer should be contained in histogram filters