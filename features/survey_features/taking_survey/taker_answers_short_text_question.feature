@taking @complete @shortText @survey @smokeTest5 @surveyTaking @surveyTakingShortText

Feature: Answering short text question in survey

	As as user
	I want to answer a short text question
	In order to express my answer with a short text in the question

	Scenario: The user answers short text question
		Given the user has an app
			And the user has a "survey" with a "short_text" question
		When the user take the qrvey
			And the user selects answers in "short_text" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page