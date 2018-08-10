@assuring @todo @integration

Feature: Assuring answering numeric questions works properly

	As an user
	I want to be sure the numeric questions works properly
	In order to avoid it's repetitive bugs

	Scenario: the user answers with other chars than numbers
		Given that there is a qrvey with a numeric question
			And that the user is answering a numeric question
			And the Ok button is displayed
		When the user writes in the input letters or invalid chars
			And the user clicks the OK button
		Then the qrvey should stay in the same question
			And the Ok button should remain displayed

	Scenario: the user answers with with a valid number
		Given that the user is answering a numeric question
			And the Ok button is displayed
		When the user writes in the input a valid number
			And the user clicks the OK button
		Then the qrvey should not be in the same question

	Scenario: the user writes nothing
		Given that the user is answering a numeric question
			And the Ok button is displayed
		When the user clicks the OK button
		Then the qrvey should stay in the same question
			And the Ok button is displayed

	Scenario: the user click the skip question option
		Given that there is a qrvey with an optional numeric question
			And that the user is answering a numeric question
			And the Ok button is displayed
		When the user clicks on the skip question button
		Then the next question or the done page should be displayed

	@todo
	Scenario: the user writes a numeric answer outside the min max boundaries
		Given that there is a qrvey with a numeric question that has min max
			And that the user is answering a numeric question that has min max
			And the Ok button is displayed
		When the user writes in the input a valid number that is outside the min max range
			And the user clicks the OK button
		Then the qrvey should stay in the same question
			And the Ok button should remain displayed

	@todo
	Scenario: the user writes a numeric answer inside the min max boundaries
		Given that there is a qrvey with a numeric question that has min max
			And that the user is answering a numeric question that has min max
			And the Ok button is displayed
		When the user writes in the input a valid number that's in the min max range
			And the user clicks the OK button
		Then the qrvey should not be in the same question

	Scenario: the user writes more than one decimal symbol
		Given that there is a qrvey with a numeric question that allows decimals but has no min max
			And that the user is answering a numeric question
			And the Ok button is displayed
		When the user writes in the input a number with more than one decimal symbol
			And the user clicks the OK button
		Then the qrvey should stay in the same question
			And the Ok button should remain displayed

	Scenario: the user writes only one decimal symbol
		Given that there is a qrvey with a numeric question that allows decimals but has no min max
			And that the user is answering a numeric question
			And the Ok button is displayed
		When the user writes in the input a number with one decimal symbol
			And the user clicks the OK button
		Then the qrvey should not be in the same question