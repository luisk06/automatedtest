@analyticQ @analyzing @questionnaire @analyzingQuestionnaire @analyzingQuestionnairePhone @todo @deprecated

Feature: The user displays expression question results in questionnaire

	As an user
	I want see the results of an phone question
	In order to analyse them

	Scenario: The user filters the results of a questionnaire that has a phone question with different number of answers and filters them by the different answers
		Given that there is a webform app with a "questionnaire" with a "phone" question that has 34 answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on select columns menu
			And the user clicks on show all columns option
			And the user uncheck all columns
			And the user check all columns
		Then the form results dashboard is empty