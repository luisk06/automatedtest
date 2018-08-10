@taking @complete @shortText @forms @formsTaking

Feature: Answering short text question in forms

	As as user
	I want to answer a short text question
	In order to express my answer with a short text in the question

	Scenario: The user answers short text question in forms
		Given the user has an app
			And that the user has a "forms" with "short_text" question left
		When the user take the qrvey
			And the user selects answers in "short_text" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page