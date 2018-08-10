@analyticQ @analyzing @questionnaire @analyzingQuestionnaire @analyzingQuestionnaireShortText @todo @deprecated

Feature: The user displays short text question results in questionnaire

	As an user
	I want see the results of an short text question
	In order to analyse them

	Scenario: The user filters the results of a short text with 34 answers in questionnaire to finish on empty
		Given that there is a webform app with a "questionnaire" with a "short text" question that has 34 answers and 5 "arya"
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on select columns menu
			And the user clicks on show all columns option
			And the user uncheck all columns
			And the user check all columns
		Then the form results dashboard is empty

	Scenario: The user filters the results of a short text with 34 answers in questionnaire
		Given that there is a webform app with a "questionnaire" with a "short text" question that has 34 answers and 5 "arya"
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on sort column button
		Then the first result must be "arya"