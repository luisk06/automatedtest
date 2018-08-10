@taking @todo @deprecated @takingYesNo @yes-no @questionnaire @questionnaireTaking

Feature: The user answers yes no question in questionnaire

	As as user
	I want to answer a Yes/No question
	In order to express my answer with a yes no question

  	@smokeTest
	Scenario Outline: The user answers yes no question and selects <answers> answers in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "yes_no" question left
		When the user take the qrvey
			And the user selects "<answers>" answers
			And the user clicks the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page

		Examples:
		  	| answers 	|
			| no    	|
		  	| yes   	|