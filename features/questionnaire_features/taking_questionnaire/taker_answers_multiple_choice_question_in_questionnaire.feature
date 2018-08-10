@todo @deprecated @taking @multipleChoice @questionnaire @questionnaireTaking

Feature: The user answers multiple choice question in questionnaire

	As as user
	I want to answer a qrvey with a multiple choice question
	in order to express answer with predefined options

	@multipleChoiceBoth
	Scenario: The user answers multiple choice question in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "multiple_choice" question left
		When the user take the qrvey
			And the user selects the desired answer choice
			And clicks on the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page