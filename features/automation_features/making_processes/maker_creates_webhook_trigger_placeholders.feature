@todo @automation @making @processes @webhookFormPlaceholders

Feature: The user creates trigger webhook for online form

	As an user
	I want to create webhook processes
	In order to test the use of placeholders

	Scenario Outline: The user creates a single process as webhook trigger with <Action>
		Given the user has an app
			And the user has login
		When the user creates a "process" in "automation" app
			And the user clicks on trigger select
			And the user select webhook option
			And the user clicks on copy button to save url
			And the user save the current url of process
			And the user has login
			And that the user has a "forms" with "numeric-number" question
			And the user creates a "process" in "automation" app
			And the user selects the king of process as "new-response"
			And the user selects the king of new response as "forms"
			And the user selects the qrvey 1 of the list of "forms"
			And the user opens the actions
			And the user selects the "webhook" action
			And the user put the webhook url
			And the user clicks on Activate
			And the user returns to webhook process
			And the user opens the actions
			And the user selects the "<Action>" action
			And the user opens placeholders
		Then the modal show numeric placeholder

		Examples:
			| Action          |
			| send-email      |
			| send-sms        |