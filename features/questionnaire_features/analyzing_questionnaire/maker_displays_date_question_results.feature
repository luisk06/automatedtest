@todo @deprecated @analyticQ @analyzing @displays_date_question_results_questionnaire @date @questionnaire

Feature: The user displays a date question results in questionnaire

	As an user
	I want see the results of a date question in a form
	In order to analyse the open responses of the users

	Scenario: The user filters the results of a date question with 30 answers
		Given that there is a webform app with a "questionnaire" with a "date" question that has 30 answers with the following dates:
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
			And the user clicks on select columns menu
			And the user clicks on show all columns option
			And the user uncheck all columns
		Then the form results dashboard is empty