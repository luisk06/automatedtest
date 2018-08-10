@complete @automation @making @processes @processResponseForm

Feature: The user creates processes of new response type for online form

	As an user
	I want to create new response processes
	In order to test the use of placeholders

	Scenario Outline: The user creates a process as new response with <Action>
		Given the user has an app
			And the user has login
			And the user has a process "new_response"
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "forms"
			And the user selects the qrvey 1 of the list of "forms"
			And the user opens the actions
			And the user selects the "<Action>" action
			And the user add a new placeholder
		Then in the panel the new numeric placeholder is shown

		Examples:
			| Action     |
			| send-sms   |
			| webhook    |