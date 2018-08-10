@taking @complete @takingYesNo @yes-no @survey @smokeTest5 @surveyTaking

Feature: Answering yes no question in survey

	As as user
	I want to answer a yes-no question
	in order to express my answer with a yes no question

	Scenario Outline: The user answers yes no question where selects <text> option in survey
		Given the user has an app
			And the user has a "survey" with a "yes_no" question
		When the user take the qrvey
			And the user selects "<answers>" answers
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

		Examples:
		  	| text | answers |
			| yes  | no      |
		  	| no   | yes     |