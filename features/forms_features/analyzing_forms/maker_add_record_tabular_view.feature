@complete @forms @addRecordAnalyzeForm @formsAnalyzing

Feature: Add records on Forms tabular view

	As an user
	I want to open the add modal
	In order of add new records

	Scenario: The user has a forms with 2 answers and adds a new record
		Given that there is a webform app with a "forms" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "add" record button
			And the user take the qrvey on "analyzeForm"
			And the user selects the desired answer choice
			And the user clicks the "add" button to confirm
		Then the table should have 3 records

	Scenario: The user does not fill the forms and press add
		Given that there is a webform app with a "forms" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "add" record button
			And the user take the qrvey on "analyzeForm"
			And the user clicks the "add" button to confirm
		Then the modal should not be hidden

	Scenario: Press cancel button on add record modal
		Given that there is a webform app with a "forms" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "add" record button
			And the user closes the modal in analyze
		Then the table should have 2 records