@complete @automation @processes @findRecord

Feature: The user creates processes with a find record action

	As an user
	I want to create processes
	In order to find records and Automate actions according to the result

	Scenario: The user create a workflow with find record action and forms
		Given the user has an app
			And the user has login
			And the user was subscribed
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user has a process "scheduling"
			And the user opened his app on "workflows"
			And the user opens the first "scheduling" process
			And the user opens the actions
			And the user selects the "find-record" action
			And the user selects the "form" type in find record of "workflow"
			And the user selects the qrvey in position 1 in find record
			And the user select the address question to compare
			And the user fills a new action inside "findrecord"
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user fills a new sms action inside "findrecord" with record not found
			And the user put 1 contacts in sms in not found
			And the user put the message in sms in not found
			And the user clicks on Activate
		Then the process is saved