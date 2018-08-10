@complete @actions @process @processActionEmail

Feature: The user creates a process with a send email action

	As an user
	I want to create processes
	In order to automate the send of emails

	Background:
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"

	Scenario Outline: The user has a webform with a <typeOfProcess> process with a send email action
			And the user has a process "<typeOfProcess>"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the action is saved

		Examples:
			| typeOfProcess  | numberOfContacts |
			| scheduling     | 2                |
			| new_response   | 3                |

	Scenario Outline: The user has a webform with a <typeOfProcess> process with a send email action and want to manages the template
			And the user has a process "<typeOfProcess>"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on templates icon
			And the user clicks on manage templates option
		Then the email templates modal is showed

		Examples:
			| typeOfProcess  | numberOfContacts |
			| scheduling     | 1                |

	Scenario Outline: The user has a webform with a <typeOfProcess> process with a send email action and want to save as a new template
			And the user has a process "<typeOfProcess>"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on templates icon
			And the user clicks on Save as a new template option
			And the user fills the template name
			And the user clicks the save template button
		Then template was sucefully saved

		Examples:
			| typeOfProcess  | numberOfContacts |
			| scheduling     | 1                |

	Scenario Outline: The user has a webform with a <typeOfProcess> process with a send email action and want to save to another template
			And the user has a process "<typeOfProcess>"
			And the user has login
			And the user opens the just created app
			And the user opened his app on "config"
			And the user clicks on the settings tab
			And the user opens the email templates modal
			And the user clicks on create template
			And the user write the template name as "Template Name"
			And the user mark the template as default
			And the user clicks the save button
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on templates icon
			And the user clicks on Save to option
		Then the changes in the template were saved

		Examples:
			| typeOfProcess  | numberOfContacts |
			| scheduling     | 1                |