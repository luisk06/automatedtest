@complete @analyticQ @analyzing @apply_buttons_filters_forms @date @forms @formsAnalyzing

Feature: Grouping and aggregate on Tabular view forms

	As an user
	I want see the results of a date question in a form
	In order to analyse the open responses of the users

	Scenario: The user grouping the results of a forms using analysis options
		Given that there is a webform app with a "forms" with a "date" question that has 30 answers with the following dates:
				| dates    |
				| 01/01/01 |
				| 02/02/02 |
				| 03/03/03 |
				| 04/04/04 |
				| 05/05/05 |
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the "group" option of analyze section
			And the user select a column in the form table to apply "group"
		Then the "group" was succefully applied

	Scenario: The user aggregate the results of a forms using analysis options
		Given that there is a webform app with a "forms" with a "date" question that has 30 answers with the following dates:
				| dates    |
				| 01/01/01 |
				| 02/02/02 |
				| 03/03/03 |
				| 04/04/04 |
				| 05/05/05 |
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the "aggregate" option of analyze section
			And the user clicks aggregate menu
			And the user hits the count option
		Then the user can see the number of answers