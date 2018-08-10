@complete @actions @process @processExamineData

Feature: The user creates processes with an examine data action

	As an user
	I want to create processes
	In order to examine data

	Background:
		Given that there is a webform app with a "quiz" with a "multiple choice" question that has 5 answers
			And the user has login

	Scenario Outline: The user create a scheduling trigger with examine data action with <filter> condition and answers <filterOption> <value>
			And the user has a process "scheduling"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "examinedata" action
			And the user selects the "quiz" process 1 in "examinedata"
			And the user clicks on "add_condition" condition
			And the user select the "<filter>" filter for condition
			And the user selects the filter option "<filterOption>"
			And the user writes "<value>" in the filter input
			And the user fills a new action inside "examinedata"
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| filterOption  | filter  | value 	|
			| equals     	| score   |	1		|
			| not equal 	| score   |	1		|
			| greater than 	| score   |	1		|
			| less than 	| score   |	1		|
			| equals     	| rank    |	1		|
			| not equal 	| rank    |	1		|
			| greater than 	| rank    |	1		|
			| less than 	| rank    |	1		|

	Scenario Outline: The user create a scheduling trigger with examine data action with <filter> condition and answers <filterOption> <min> and <max>
			And the user has a process "scheduling"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user opens the actions
			And the user selects the "examinedata" action
			And the user selects the "quiz" process 1 in "examinedata"
			And the user clicks on "add_condition" condition
			And the user select the "<filter>" filter for condition
			And the user selects the filter option "<filterOption>"
			And the user writes "<min>" in the "min" value input
			And the user writes "<max>" in the "max" value input
			And the user fills a new action inside "examinedata"
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| filterOption  | filter  | min 	| max 		|
			| between     	| score   |	1		|	2		|
			| between     	| rank    |	1		|	2		|