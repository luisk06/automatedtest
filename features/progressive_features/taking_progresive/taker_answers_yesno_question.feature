@taking @todo @takingYesNo @yes-no @progressiveTaking @progressiveTakingYesNo

Feature: The user answers yes no question

	As as user
	I want to answer a Yes/No question
	In order to express my answer with a yes no question

	Scenario Outline: The user answers yes no question and selects <text> answers
		Given the user has an app
			And the user has a "progressive" with a "yes_no" question
		When the user selects <answers> answers in "progressive"
			And clicks on the Ok button in "progressive"
		Then the window should be hidden

		Examples:
			| text | answers |
			| yes  | "no"    |
			| no   | "yes"   |