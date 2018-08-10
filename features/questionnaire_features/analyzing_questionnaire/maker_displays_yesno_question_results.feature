@analyticQ @analyzing @questionnaire @analyzingQuestionnaire @analyzingQuestionnaireYesno @todo @deprecated

Feature: The user displays yes no question results in questionnaire

	As an user
	I want see the results of an multiple choice question
	In order to analyse them

	Scenario: The user filters the results of a yes no in survey with 34 answers
		Given that there is a webform app with a "questionnaire" with a "yes-no" question that has 34 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on select columns menu
			And the user clicks on show all columns option
			And the user uncheck all columns
			And the user check all columns
		Then the form results dashboard is empty