@analyticQ @analyzing @forms @formsAnalyzing @formsAnalyzingNumeric @complete

Feature: Sorting records on a numeric question results in forms tabular view

	As an user
	I want see the results of an numeric question
	In order to analyse them

	Scenario: The user sorts (0-9) the results of a forms that has a numeric question
		Given that there is a webform app with a "forms" with a "numeric" question that has 34 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on sort column button
		Then the first result must be "1"