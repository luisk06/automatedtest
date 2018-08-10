@analiticQ @analyzing @complete @quiz @quizAnalyzing @YesNo @testOne

Feature: Applying a filter to yes no question results in quiz

	As an user
	I want see the results of a yes no question
	In order to analyse them by looking at the different predefined options that have been answered

	@analyzingYesNoQuestionResults @smokeTest3
	Scenario Outline: The user filters the results of a yes no question by <filteredAnswer> with <numAnswers> answers
		Given that there is a webform app with a "quiz" with a "yes-no" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the "<filteredAnswer>" filter as text
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" is a yes no answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer |
			| 8          | Yes            |
			| 13         | No             |