@taking @complete @expression @survey @smokeTest2 @surveyTakingExpression @surveyTaking

Feature: Answering expression question in survey

	As as user
	I want to answer a short text question
	In order to express my answer with a short text in the question

	Scenario: The user answers expression question
		Given the user has an app
			And the user has a "survey" with a "expression" question
		When the user take the qrvey
			And the user selects answers in "expression" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

	@todo
	Scenario: The user answers expression question with categories
		Given the user has an app
			And the user has a "survey" with a "expression_with_categories" question
		When the user take the qrvey
			And the user selects answers in "expression_with_categories" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page