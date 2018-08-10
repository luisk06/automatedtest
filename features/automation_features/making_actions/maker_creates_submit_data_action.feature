@actions @process @processSubmitData

Feature: The user creates a process with a actions

	As an user
	I create a process in order to submit data
	to remote url

	Scenario Outline: The user has a webform with a <type> process with a send email action in <typeOfQrvey>
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
			And the user has a process "webhook"
			And the user opened his app on "workflows"
			And the user opens the first "webhook" process
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put 1 contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
			And the user has a process "new_response"
		When the user opened his app on "workflows"
			And the user opens the first "webhook" process
			And the user opens the actions
			And the user selects the "webhook" action
			And the user put the webhook url
			And the user clicks on Activate
		Then the process is activated

		Examples:
			| typeOfQrvey     |
			| survey          |
			| forms           |