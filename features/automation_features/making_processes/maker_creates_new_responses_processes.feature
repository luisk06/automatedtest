@making @processes @processNewResponse @todo

Feature: The user creates processes of new response type

	As an user
	I want to create processes
	In order to automate the send of emails

	Scenario Outline: The user creates an application with a new response trigger and <typeOfResponse> and fields
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<webform>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfResponse>"
			And the user creates a workflow proccess
		When the user selects the king of process as "new-response"
			And the user selects the king of new response as "<typeOfResponse>"
			And the user selects the qrvey 1 of the list of "<typeOfResponse>"
			And the user clicks on AddCondition
			And the user selects the "fields" option
			And the user add the first field
			And the user selects "<answerCondition>" as answer condition
			And the user write the data value
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put 1 contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfResponse | webform     	   | answerCondition |
			| form           | multiple choice | answer-is       |
			| form           | multiple choice | answer-not      |
			| form  		 | numeric  	   | equals          |
			| form  		 | numeric  	   | not-equal       |
			| form  		 | numeric  	   | greater-than    |
			| form  		 | numeric  	   | less-than       |
			| form 			 | numeric  	   | between         |
			| form			 | date			   | equals          |
			| form			 | date			   | not-equal       |
			| form			 | date			   | before          |
			| form			 | date			   | after           |
			| form			 | date			   | between         |

	Scenario Outline: The user creates an application with a new response trigger and <typeOfResponse> and fields
		Given the user has an app
			And the user has login
			And the user have a "<typeOfResponse>" created
			And the user creates a workflow proccess
		When the user selects the king of process as "new-response"
			And the user selects the king of new response as "<typeOfResponse>"
			And the user selects the qrvey 1 of the list of "<typeOfResponse>"
			And the user clicks on AddCondition
			And the user selects the "fields" option
			And the user add a field
			And the user selects "<answerCondition>" as answer condition
			And the user write the data value
			And the user select a sentiment of type "<sentimentType>"
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfResponse | answerCondition 	| sentimentType |
			| form-with-text | equals       	| positive    	|
			| form-with-text | equals       	| neutral     	|
			| form-with-text | equals       	| negative    	|
			| form-with-text | not-equals   	| positive    	|
			| form-with-text | not-equals   	| neutral     	|
			| form-with-text | not-equals   	| negative    	|
			| form-with-text | contains     	| positive    	|
			| form-with-text | contains     	| neutral     	|
			| form-with-text | contains     	| negative    	|
			| form-with-text | not-contains 	| positive    	|
			| form-with-text | not-contains 	| neutral     	|
			| form-with-text | not-contains 	| negative    	|

	Scenario Outline: The user creates an application with a new response trigger and checklist and <answerCondition>
		Given the user has an app
			And the user has login
			And the user have a "checklist" created
			And the user creates a workflow proccess
		When the user selects the king of process as "new-response"
			And the user selects the king of new response as "checklist"
			And the user selects the qrvey 1 of the list of "checklist"
			And the user clicks on AddCondition
			And the user selects the "fields" option
			And the user add a field
			And the user selects "<answerCondition>" as answer condition
			And the user select all checklist items
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| answerCondition |
			| any-checked     |
			| all-checked     |
			| any-unchecked   |
			| all-unchecked   |

	Scenario Outline: The user creates an form with a new response trigger and <typeOfResponse>
		Given the user has an app
			And the user has login
			And the user have a "<typeOfResponse>" created
			And the user creates a workflow proccess
		When the user selects the king of process as "new-response"
			And the user selects the king of new response as "<typeOfResponse>"
			And the user selects the qrvey 1 of the list of "<typeOfResponse>"
			And the user clicks on AddCondition
			And the user selects the "responses-number" option
			And the user open the "responses-number" select
			And the user selects <responsesFilter> in the number of responses filter
			And the user write the number of responses value
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put <numberOfContacts> contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfResponse  |
			| form            |
			| checklist       |