@analyticQ @analyzing @forms @editQuestionResults @complete @formsAnalyzing

Feature: Update address records in forms tabular view

	As an user
	I want to edit the answers
	In order to update the questions

	Scenario: The user edit the answers in the analyze section
		Given that there is a webform app with a "forms" with a "address" question that has 20 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the "edit" option of analyze section
			And the user selects the first answer to edit
			And the user edits the form question
			And the user selects answers in "address" question
			And the user clicks the Update button
		Then the first form result is updated

	Scenario: The user clicks the update button without update the form
		Given that there is a webform app with a "forms" with a "address" question that has 20 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the "edit" option of analyze section
			And the user selects the first answer to edit
			And the user clicks the Update button
		Then the first form result is not changed