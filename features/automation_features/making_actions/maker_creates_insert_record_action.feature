@actions @process @processInsertRecord

Feature: The user creates a process with a actions

	As an user
	I want to make a process
	In order to Insert records in a qrvey

	Scenario Outline: The user has a webform with a <typeOfProcess> process with a send email action
		Given the user has login
			And the user has a process "<typeOfProcess>"
		When the user go to "automation" dashboard
			And the user opens the first process
			And the user opens the actions
			And the user selects the "insert-record" action
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfProcess | numberOfContacts |
			| scheduling   	| 2                |
			| new_response 	| 3                |