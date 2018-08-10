@todo @taking @multipleChoice @progressiveTaking @progressiveTakingMultipleChoice

Feature: The user answers multiple choice question

	As as user
	I want to answer a qrvey with a multiple choice question
	in order to express answer with predefined options

	@smokeTest5
	Scenario: The user answers multiple choice question
		Given the user has an app
			And the user has a "progressive" with a "multiple_choice" question
		When the user selects the desired answer choice in "progressive"
			And clicks on the Ok button in "progressive"
		Then the window should be hidden