@taking @complete @surveyTaking @surveyTakingLongText @long-text @survey @smokeTest5

Feature: Answering long text question in survey

	As as user
	I want to answer a long text question
	In order to express my answer with a long text in the question

	Scenario: The user answers long text question
		Given the user has an app
			And the user has a "survey" with a "long_text" question
		When the user take the qrvey
			And the user selects answers in "long_text" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page