@complete @taking @surveyTaking @multipleChoice @survey

Feature: Answering multiple choice question with image option in survey

	As as user
	I want to answer a qrvey with a multiple choice question
	in order to express answer with predefined options

	@smokeTest3
	Scenario: The user answers multiple choice question
		Given the user has an app
			And that the user answers a qrvey with a multiple choice question
		When the user take the qrvey
			And the user selects the desired answer choice
			And clicks on the Ok button
		Then the user should jump to the finished qrvey page

	Scenario: The user answers multiple choice question with Other option
		Given the user has an app
			And that the user answers a qrvey with a multiple choice question with other question
		When the user take the qrvey
			And the user selects the Other option
			And writes their answer
			And clicks on the Ok button
		Then the user should jump to the finished qrvey page

	Scenario: The user answers multiple choice question with Allow multiple selections
		Given the user has an app
			And that the user answers a qrvey with a multiple choice question with allow multiple selections
		When the user take the qrvey
			And the user selects 3 answer choices
			And clicks on the Ok button
		Then the user should jump to the finished qrvey page

	@multipleChoiceBoth
	Scenario: The user answers multiple choice question with Allow multiple selections and Other option field
		Given the user has an app
			And that the user answers a qrvey with a multiple choice question with allow multiple selections and Other option
		When the user take the qrvey
			And the user selects 3 answer choices
			And the user selects the Other option again
			And writes their own answer
			And clicks on the Ok button
		Then the user should jump to the finished qrvey page