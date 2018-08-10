@taking @complete @takingYesNo @yes-no @forms @formsTaking @userside_answering_yes_no

Feature: Answering yes-no question in forms

	As as user
	I want to answer a yes no question
	In order to express my answer with a yes no question

	@smokeTest3
	Scenario Outline: The user answers yes no question and selects <answer> answers in forms
		Given the user has an app
			And that the user has a "forms" with "yes_no" question left
		When the user take the qrvey
			And the user selects "<answers>" answers
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

		Examples:
			| answers |
			| yes     |
			| no      |