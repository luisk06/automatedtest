@taking @todo @shortText @progressiveTaking @progressiveTakingShortText

Feature: The user answers short text question in progressive

	As as user
I want to answer a short text question
	In order to express my answer with a short text in the question

	Scenario: The user answers short text question
		Given the user has an app
			And the user has a "progressive" with a "short_text" question
		When the user answers the "short_text" question in the "incontext"
			And clicks on the Ok button in "progressive"
		Then the window should be hidden