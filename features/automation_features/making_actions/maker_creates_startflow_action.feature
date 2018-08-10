@complete @automation @making @processes @startflow

Feature: The user creates processes

	As an user
	I want to create processes
	In order to automate the start of new flows

	Scenario: The user creates a single process as scheduling to run in background
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
		When the user has a process "scheduling"
			And the user opened his app on "workflows"
			And the user opens the first "scheduling" process
			And the user opens the actions in startflow
			And the user selects the "webhook" action
			And the user write "qrvey.com" as webhook url
			And the user clicks on Activate
			And the user has a process "new_response"
			And the user opened his app on "workflows"
			And the user opens the first "new_response" process
			And the user selects the king of new response as "survey"
			And the user selects the qrvey 1 of the list of "survey"
			And the user opens the actions
			And the user selects the "start-flow" action
			And the user selects the schedule process 1 of the list
			And the user clicks on Activate
		Then the process is saved