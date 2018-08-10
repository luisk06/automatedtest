@regression @automation @making @processes @processResponseForm

Feature: The user creates processes of new response type for quiz

	As an user
	I want to create new response processes
	In order to test the use of conditions

	@currentK
	Scenario Outline: The user creates a process as new response with <filterConditiion> condition
		Given that there is a webform app with a "quiz" with a "multiple choice" question that has 3 answers
			And the user has login
			And the user has a process "new_response"
			And the user opens the just created app
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "quiz"
			And the user selects the qrvey 1 of the list of "quiz"
			And the user clicks on AddCondition
			And the user selects the "<filter>" option
			And the user clicks on the condition dropdown
			And the user selects "<filterConditiion>" as answer condition
			And the user type a score that that does not exceed the top score in <value> Pts input
			And the user selects the "send-sms" action inside a condition
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| filterConditiion	| filter  | value 	|
			| greater than 		| score   |	0		|
			| less than 		| score   |	1		|
			| greater than 		| rank    |	3		|
			| less than 		| rank    |	1		|

	@exceeding
	Scenario Outline: The user creates a process as new response with <filterConditiion> condition but exceeding the top <filter>
		Given that there is a webform app with a "quiz" with a "multiple choice" question that has 3 answers
			And the user has login
			And the user has a process "new_response"
			And the user opens the just created app
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "quiz"
			And the user selects the qrvey 1 of the list of "quiz"
			And the user clicks on AddCondition
			And the user selects the "<filter>" option
			And the user clicks on the condition dropdown
			And the user selects "<filterConditiion>" as answer condition
			And the user type a score that that exceed the top score in "Pts" input
			And the user selects the "send-sms" action inside a condition
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is not saved

		Examples:
			| filterConditiion	| filter  |
			| equal     		| score   |
			| does not equal 	| score   |
			| greater than 		| score   |
			| less than 		| score   |
			| equal     		| rank    |
			| does not equal 	| rank    |
			| greater than 		| rank    |
			| less than 		| rank    |

	@automationTestUnit
	Scenario Outline: The user creates a process as new response with <filterConditiion> condition but exceeding the top <filter>
		Given that there is a webform app with a "quiz" with a "multiple choice" question that has 3 answers
			And the user has login
			And the user has a process "new_response"
			And the user opens the just created app
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "quiz"
			And the user selects the qrvey 1 of the list of "quiz"
			And the user clicks on AddCondition
			And the user selects the "<filter>" option
			And the user clicks on the condition dropdown
			And the user selects "<filterConditiion>" as answer condition
			And the user type a score that that exceed the top score in "Pts" input
			And the user selects the "send-sms" action inside a condition
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is not saved

		Examples:
			| filterConditiion	| filter  |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |
			| does not equal 	| rank    |

	@automationTestUnit2
	Scenario Outline: The user creates a process as new response with <filterConditiion> condition but exceeding the top <filter>
		Given that there is a webform app with a "quiz" with a "multiple choice" question that has 3 answers
			And the user has login
			And the user has a process "new_response"
			And the user opens the just created app
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "quiz"
			And the user selects the qrvey 1 of the list of "quiz"
			And the user clicks on AddCondition
			And the user selects the "<filter>" option
			And the user clicks on the condition dropdown
			And the user selects "<filterConditiion>" as answer condition
			And the user type a score that that exceed the top score in "Pts" input
			And the user selects the "send-sms" action inside a condition
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is not saved

		Examples:
			| filterConditiion	| filter  |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |
			| equal     		| rank    |

	@createnrempty
	Scenario: The user creates a process as new response with empty condition
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
			And the user selects "empty" as answer condition for the question
			And the user selects the "send-sms" action inside a condition
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is saved