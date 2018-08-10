@analyticQ @analyzing @forms @formsAnalyzing @formsAnalyzingLongText @complete

Feature: Sorting records on a long text question results in forms tabular view

	As an user
	I want see the results of an long text question
	In order to analyse them

	Scenario: The user sorts (A-Z) the results of a forms that has a long text question
		Given that there is a webform app with a "forms" with a "long text" question that has 34 answers and 5 "A store is not as good as online"
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on sort column button
		Then the first result must be "A store is not as good as online"