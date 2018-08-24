@analyzing @todo @checklist @analyzingChecklist @analyzeChecklistIndividualResponses

Feature: Filtering checklist answers on individual responses view

	As an user
	I want to analyze the results of a checklist on a individual response view
	In order to focus on specific details

	Scenario Outline: Filtering by checked answers
		Given that the user has a webform app with a checklist created with <numAnswers> of answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user selects "individual" from dropdown
			And the user filter "checked" responses
		Then each response should only contain "checked" option list

		Examples:
			| numAnswers |
			| 4          |
			| 10         |

	Scenario Outline: Filtering by unchecked answers
		Given that the user has a webform app with a checklist created with <numAnswers> of answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user selects "individual" from dropdown
			And the user filter "unchecked" responses
		Then each response should only contain "unchecked" option list

		Examples:
			| numAnswers |
			| 4          |
			| 10         |

	Scenario Outline: Filtering answers by entering a keyword
		Given that the user has a webform app with a checklist created with <numAnswers> of answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user selects "individual" from dropdown
			And the user type "test" on keyword input
		Then the total of "individual" answers should be <filteredAnswers>

		Examples:
			| numAnswers | filteredAnswers |
			| 4          | 1               |
			| 10         | 1               |