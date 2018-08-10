@analyticQ @analyzing @questionnaire @analyzingQuestionnaire @analyzingQuestionnaireUsAddress @todo @deprecated

Feature: The user displays us address question results in questionnaire

	As an user
	I want see the results of an us address question
	In order to analyse them

	Scenario: The user filters the results of a questionnaire that has a us address question with 20 answers
		Given that there is a webform app with a "questionnaire" with a "us_address" question that has 20 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on select columns menu
			And the user clicks on show all columns option
			And the user uncheck all columns
			And the user check all columns
		Then the form results dashboard is empty