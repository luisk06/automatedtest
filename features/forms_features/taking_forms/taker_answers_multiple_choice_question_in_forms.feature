@complete @taking @multipleChoice @forms @formsTaking

Feature: Answering multiple choice question in forms

	As as user
	I want to answer a qrvey with a multiple choice question
	in order to express answer with predefined options

	@multipleChoiceBoth
	Scenario: The user answers multiple choice question in forms
		Given the user has an app
			And that the user has a "forms" with "multiple_choice" question left
		When the user take the qrvey
			And the user selects the desired answer choice
			And clicks on the Ok button
		Then the user should jump to the finished qrvey page

	Scenario: The user answers multiple choice question with Allow multiple selections in forms
		Given the user has an app
			And that the user has a "forms" with "multiple_choice_with_allow_multiple_selections" question left
		When the user take the qrvey
			And the user selects 3 answer choices
			And clicks on the Ok button
		Then the user should jump to the finished qrvey page