@complete @analyticQ @dashboardAN @analyzing @addToDashboard

Feature: Adding questions to favorites

	As an user
	I want add to dashboard the results
	In order to analyze the answers

	Scenario Outline: The user add a <typeOfQrvey> with a <typeOfQuestion> to favorites
		Given that there is a webform app with a "<typeOfQrvey>" with a "<typeOfQuestion>" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user add the chart to dashboard
			And the user go to the analytic dashboard
		Then the chart of "<typeOfQuestion>" should appear in the dashboard
			And the chart can be deleted

		Examples:
			| typeOfQrvey   | typeOfQuestion             | numAnswers |
			| survey        | multiple choice            | 30         |
			| survey        | expression                 | 30         |
			| survey        | expression_with_categories | 30         |
			| survey      	| numeric                    | 30         |
			| survey      	| rating                     | 30         |
			| survey      	| short text                 | 30         |
			| survey      	| long text                  | 30         |
			| survey      	| yes-no                     | 30         |
			| survey      	| ranking                    | 30         |
			| survey      	| slidebar                   | 30         |
			| survey      	| image                      | 30         |