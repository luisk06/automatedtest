@taking @complete @longTexto @forms @formsTaking @formsLongText

Feature: Answering long text question in forms

	As as user
	I want to answer a long text question
	In order to express my answer with a short text in the question

	Scenario: The user answers long text question in forms
		Given the user has an app
			And that the user has a "forms" with "long_text" question left
		When the user take the qrvey
			And the user selects answers in "long_text" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page