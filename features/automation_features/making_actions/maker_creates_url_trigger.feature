@actions @process @urlTrigger

Feature: The user creates a process with a Trigger URL

	As an user
	I want to create a Triger URL
	In order to check diferent scenarios

	Scenario Outline: The user has a new response process with a webhook action in <typeOfResponse>
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfResponse>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfResponse>"
		When the user has a process "webhook"
			And the user opened his app on "workflows"
			And the user opens the first "webhook" process
			And the user clicks on copy button to save url
			And the user opens the actions
			And the user selects the "send-sms" action
			And the user put 1 contacts as addressee
			And the user put the message in sms
			And the user clicks on Activate
			And the user opens the trigger url
		Then the qrvey opened is the same selected

		Examples:
			| typeOfResponse  |
			| survey          |
			| forms           |
			| polling         |

	Scenario Outline: The user has an <typeOfProcess> with url trigger and a send email action
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user has a process "webhook"
			And the user opened his app on "workflows"
			And the user opens the first "webhook" process
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfProcess | numberOfContacts |
			| scheduling    | 2                |
			| new_response  | 3                |

	Scenario Outline: The user has an url trigger with a send SMS action with <numberOfContacts> contacts
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user has a process "webhook"
			And the user opened his app on "workflows"
			And the user opens the first "webhook" process
			And the user opens the actions
			And the user selects the "send-sms" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the sms message
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| numberOfContacts |
			| 2                |
			| 3                |