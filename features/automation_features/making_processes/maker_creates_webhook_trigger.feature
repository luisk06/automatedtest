@complete @automation @making @processes @webhook

Feature: The user creates processes of webhook type

  As an user
  I want to create processes
  In order to automate the send of emails using webhook triggers

	Background:
		Given the user has an app
			And the user has login

	Scenario: The user creates a single process as webhook trigger to run in background
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
			And the user has login
		When the user has a process "webhook"
			And the user opened his app on "workflows"
			And the user opens the first "webhook" process
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put 1 contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the process is activated

	Scenario Outline: The user has a new response process with a webhook action with <typeOfResponse>
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
			And the user has a process "webhook"
			And the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put 1 contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user opens the create webform menu
			And the user created the "<typeOfResponse>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfResponse>"
		When the user opened his app on "workflows"
			And the user creates a "process" in "automation" app
			And the user selects the king of process as "new-response"
			And the user selects the kind of new response as "<typeOfResponse>"
			And the user selects the qrvey 1 of the list of "<typeOfResponse>"
			And the user opens the actions
			And the user selects the "webhook" action
			And the user put the webhook url
			And the user clicks on Activate
		Then the process is activated

		Examples:
		  | typeOfResponse  |
		  | survey          |