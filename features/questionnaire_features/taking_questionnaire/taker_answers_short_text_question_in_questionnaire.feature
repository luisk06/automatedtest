@taking @todo @deprecated @shortText @questionnaire @questionnaireTaking @smokeTest

Feature: The user answers long text question in questionnaire

	As as user
	I want to answer a long text question
	In order to express my answer with a short text in the question

	Scenario: The user answers long text question in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "short_text" question left
		When the user take the qrvey
			And the user selects answers in "short_text" question
			And the user clicks the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page