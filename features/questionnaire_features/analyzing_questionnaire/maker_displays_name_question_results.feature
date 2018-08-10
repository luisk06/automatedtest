@analyticQ @analyzing @questionnaire @analyzingQuestionnaire @analyzingQuestionnaireName @todo @deprecated

Feature: The user displays name question results in questionnaire

	As an user
	I want see the results of an name question
	In order to analyse them

	Scenario: The user filters the results of a questionnaire that has a name question with 34 answers
		Given that there is a webform app with a "questionnaire" with a "name" question that has 34 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on select columns menu
			And the user clicks on show all columns option
			And the user uncheck all columns
			And the user check all columns
		Then the form results dashboard is empty