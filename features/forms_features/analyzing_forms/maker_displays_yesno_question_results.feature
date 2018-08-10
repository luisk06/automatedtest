@analiticQ @analyzing @complete @forms @smokeTest2 @formsAnalyzing @analyzingYesNoQuestionResults @sanityTest

Feature: Applying a filter to yes-no question in forms summary view

	As an user
	I want see the results of a yes no question
	In order to analyse them by looking at the different predefined options that have been answered

	Scenario: The user filters the results of a yes no question in forms summary view with 8 answers where selects Yes
		Given that there is a webform app with a "forms" with a "yes-no" question that has 8 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens the filter side bar
			And the user clicks on the filter button
			And the user clicks on the "Yes" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "Yes" is a yes no answer filter should appear in the histogram filters
			And the number answers should be more than 0

	Scenario: The user filters the results of a yes no question in forms summary view with 13 answers where selects No
		Given that there is a webform app with a "forms" with a "yes-no" question that has 13 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens the filter side bar
			And the user clicks on the filter button
			And the user clicks on the "No" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "No" is a yes no answer filter should appear in the histogram filters
			And the number answers should be more than 0