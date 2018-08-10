@todo @deprecated @questionnaire @deleteRecordAnalyzeQuestionnaire

Feature: The user want to delete records on analyze in questionnaire

	As an user
	I want to open the delete mode
	In order of delete records

	Scenario: The user has a questionnaire with 2 answers and want to delete the first
		Given that there is a webform app with a "questionnaire" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "delete" record button
			And the user check the first record to "delete"
			And the user clicks the "delete" button to confirm
		Then the table should have 1 records

	Scenario: The user has a questionnaire with 2 answers and want to delete all
		Given that there is a webform app with a "questionnaire" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "delete" record button
			And the user check all the records to "delete"
			And the user clicks the "delete" button to confirm
		Then the table should be empty

	Scenario: The user has a questionnaire with 2 answers, opened the delete mode but want to close it without delete records
		Given that there is a webform app with a "questionnaire" with a "multiple choice" question that has 2 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks the "delete" record button
			And the user check all the records to "delete"
		Then the table should have 2 records