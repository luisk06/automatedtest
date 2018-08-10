@complete @actions @process @processWait

Feature: The user creates a process with a wait action

	As an user
	I want to a process with a wait action
	In order to test

	Scenario Outline: The user has a webform with a <typeOfProcess> process with send email action
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user has a process "<typeOfProcess>"
			And the user opened his app on "workflows"
			And the user opens the first "<typeOfProcess>" process
			And the user opens the actions in startflow
			And the user selects the "wait" action
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfProcess | numberOfContacts |
			| scheduling   	| 2                |
			| new_response 	| 3                |