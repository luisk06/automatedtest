@complete @automation @tokens @tokenWorkflowProcesses @tokenWorkflows

Feature: The user creates tokens from qrvey loaded on trigger option new response

	As an user
	I want to add tokens from my qrveys loaded on new response trigger for my workflow
	In order use its values for actions

	Background:
		Given the user has an app
			And the user has login
			And the user has a process "new_response"

	@smokeTest1 @tokenWorkflowProcessesUnit
	Scenario Outline: The user create tokens loaded from a <qrveyApp> on new response trigger
			And that the user has a "<qrveyApp>" with a "multiple_choice" question to workflow
			And the user opened his app on "workflows"
		When the user opens the first process in workflow
			And the user selects the king of new response as "<qrveyApp>"
			And the user selects the qrvey 1 of the list of "<qrveyApp>"
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
		Then the token should be added on modal
			And the token should be added after closing modal

		Examples:
			| qrveyApp      | qrveyName 	|
			| survey        | survey		|
			| forms         | form		  	|

	Scenario: The user tries to create tokens with the same name with values loaded from a survey on new response trigger
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "survey"
			And the user selects the qrvey 1 of the list of "survey"
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
		Then the token created alert should be displayed

	Scenario: The user deletes a token loaded from a survey on new response trigger
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "survey"
			And the user selects the qrvey 1 of the list of "survey"
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
			And the user clicks on delete token 1
		Then in the panel should not exists this token "testToken"