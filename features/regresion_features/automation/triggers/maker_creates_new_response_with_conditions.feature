@regression @automation @making @processes @processResponseForm

Feature: The user creates processes of new response type for different webforms

	As an user
	I want to create new response processes
	In order to test the use of conditions

	Scenario Outline: The user creates a process as new response with <filterConditiion> condition in quiz
		Given that there is a webform app with a "quiz" with a "multiple choice" question that has 3 answers
			And the user has login
			And the user has a process "new_response"
			And the user opens the just created app
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "quiz"
			And the user selects the qrvey 1 of the list of "quiz"
			And the user clicks on AddCondition
			And the user selects the "field(s)" option
			And the user clicks on the condition dropdown
			And the user selects the first question as field answers
			And the user selects "<filterConditiion>" as answer condition for the question
			And the user selects the "send-sms" action inside a condition
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| filterConditiion	| value 	|
			| not empty     	|	1		|