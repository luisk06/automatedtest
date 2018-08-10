@analyticQ @analyzing @forms @formsAnalyzingMultipleChoice @complete @formsAnalyzing

Feature: Sorting records on a multiple choice question results in forms tabular view

	As an user
	I want see the results of an multiple choice question
	In order to analyse them

	Scenario: The user sorts (A-Z) the results of a forms that has a multiple choice question
		Given that there is a webform app with a "forms" with a "multiple choice" question that has 34 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on sort column button
		Then the first result must be "Arya Stark"