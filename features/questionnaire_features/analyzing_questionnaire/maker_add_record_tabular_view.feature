@todo @deprecated @questionnaire @addRecordAnalyzeQuestionnaire

Feature: The user want to add records on analyze in questionnaire

	As an user
	I want to open the add modal
	In order of add new records

	Scenario: The user has a questionnaire with 2 answers and want to add a new record
		Given that there is a webform app with a "questionnaire" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "add" record button
			And the user take the qrvey on "analyzeForm"
			And the user selects the desired answer choice
			And the user clicks the Ok button
			And the user clicks the "add" button to confirm
		Then the table should have 3 records

	Scenario: The user forgive to fill the new record and clicks on add button
		Given that there is a webform app with a "questionnaire" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "add" record button
			And the user take the qrvey on "analyzeForm"
			And the user clicks the "add" button to confirm
		Then the modal should not be hidden

	Scenario: The user has a questionnaire with 2 answers, try to add a new one but close the modal without add it
		Given that there is a webform app with a "questionnaire" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "add" record button
			And the user close the modal in analyze
		Then the table should have 2 records