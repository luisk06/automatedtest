@complete @automation @tokens @tokenWorkflowActions @tokenWorkflows

Feature: The user creates tokens from qrvey loaded from a examine data action options

	As an user
	I want to add tokens from my qrveys loaded on an examine data action for my workflow
	In order use its values for insert

	Background:
		Given the user has an app
			And the user has login
			And the user has a process "scheduling"

	@tokenWorkflowActionsabc
	Scenario Outline: The user create tokens loaded from a <qrveyApp> on examine data action
			And that the user has a "<qrveyApp>" with "multiple_choice" question
		When the user opened his app on "webforms"
			And the user creates a new webform
			And the user created the "<qrveyApp>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
			And the user opened his app on "workflows"
			And the user opens the first "scheduling" process
			And the user opens the actions
			And the user selects the "examinedata" action
			And the user selects examine data app type as "<qrveyApp>"
			And the user selects qrvey number 2 from the "examinedata" list
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
		Then the token should be added on modal
			And the token should be added after closing modal

		Examples:
			| qrveyApp        |
			| forms           |

	Scenario: The user tries to create tokens with the same name with values loaded from a form on examine data action
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user opened his app on "workflows"
			And the user opens the first "scheduling" process
			And the user opens the actions
			And the user selects the "examinedata" action
			And the user selects examine data app type as "forms"
			And the user selects qrvey number 1 from the "examinedata" list
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
		Then the token created alert should be displayed

	Scenario: The user deletes a token loaded from a form on examine data action
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user opened his app on "workflows"
			And the user opens the first "scheduling" process
			And the user opens the actions
			And the user selects the "examinedata" action
			And the user selects examine data app type as "forms"
			And the user selects qrvey number 1 from the "examinedata" list
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
			And the user clicks on delete token 1
		Then in the panel should not exists this token "testToken"