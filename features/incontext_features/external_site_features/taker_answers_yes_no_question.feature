@todo @incontext @yes-no @taking @noRunLocal @externalServer

Feature: The user answers a yes-no question and selects <text> answers in the in-context feedback in an external server

	As an user
	I want to answer a qrvey with a yes-no question
	in order to express answer with predefined options
	staying a external server

	Scenario Outline: The user answers a yes-no question with <answers> in the ICF and a external server
		Given the user has an app
			And that the user has a incontext external with a "yes_no" question
		When the user selects "<answers>" answers in "incontext"
			And clicks on the Ok button in "incontext"
		Then the window should be hidden

		Examples:
			| answers 	|
			| yes  		|
			| no   		|