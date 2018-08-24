@analyzing @todo @checklist @analyzingChecklist @analyzeChecklistDetailedView

Feature: Excluding checklist answers on a detailed view

	As an user
	I want to analyze the results of a checklist on a detailed view
	In order to focus on specific details

	Scenario Outline: The user exclude answers on detailed view option with <numAnswers>
		Given that the user has a webform app with a checklist created with <numAnswers> of answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user selects "single" from dropdown
			And the user exclude <numAnswersExcluded> answers from list
			And the user moves to "excluded" tab
		Then the number of excluded answers should be <numAnswersExcluded>
			And the total of "individual" answers should be <numAnswersIncluded>
			And the total of "multi" answers should be <numAnswersIncluded>

		Examples:
			| numAnswers |  numAnswersExcluded | numAnswersIncluded |
			| 8          | 4			       | 4                  |
			| 10         | 5                   | 5                  |