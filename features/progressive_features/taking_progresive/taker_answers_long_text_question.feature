@taking @todo @takingYesNo @yes-no @progressiveTaking @progressiveTakingLongText

Feature: The user answers long text question in progressive

	As as user
	I want to answer a long text question
	In order to express my answer with a short text in the question

	Scenario: The user answers long text question
		Given the user has an app
			And the user has a "progressive" with a "long_text" question
		When the user answers the "long_text" question in the "incontext"
			And clicks on the Ok button in "progressive"
		Then the window should be hidden