@complete @actions @process @processSendQrvey

Feature: The user creates a process with a send qrvey action

	As an user
	I create processes
	In order to automate the send of qrveys by email or sms

	Scenario Outline: The user has a webform with a new response process with a email action in <typeOfQrvey>
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
			And the user has a process "new_response"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "send-qrvey" action
			And the user selects the king of action as "<typeOfQrvey>"
			And the user selects the qrvey 1 of the list of "<typeOfQrvey>"
			And the user select "email" as way to send qrvey
			And the user put 2 contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   |
			| survey        |
			| form          |

	Scenario Outline: The user has a webform with a new response process with a send qrvey by sms action in <typeOfQrvey>
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
			And the user has a process "new_response"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "send-qrvey" action
			And the user selects the king of action as "<typeOfQrvey>"
			And the user selects the qrvey 1 of the list of "<typeOfQrvey>"
			And the user select "sms" as way to send qrvey
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey     |
			| survey          |
			| forms           |