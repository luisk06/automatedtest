@complete @actions @process @processActionSms

Feature: The user creates a process with a actions

	As an user
	I want to create processes
	In order to automate the send of sms

	Scenario Outline: The user has a <typeOfProcess> process with a send email action
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
			And the user has a process "<typeOfProcess>"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "send-sms" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfProcess | numberOfContacts |
			| scheduling   	| 1                |
			| new_response 	| 1                |