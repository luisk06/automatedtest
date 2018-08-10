@assuring @todo @integration

Feature: Assuring answering slidebar questions works properly

	As an user
	I want to be sure that the slider from the slidebar question works properly
	In order to avoid it's repetitive bugs

	Scenario: the user answers a slidebar question
		Given that there is a qrvey with a slidebar question
			And that the user is answering a slidebar question
			And the Ok button is displayed
			And the slider should be in the center
		When the user writes in the input letters or invalid chars
			And the user clicks the OK button
		Then the qrvey should stay in the same question
			And the Ok button should remain displayed

	Scenario: The user creates a slidebar question
		Given that there is a qrvey with a numeric question
			And that the user is answering a numeric question
			And the Ok button is displayed
		When the user writes in the input letters or invalid chars
			And the user clicks the OK button
		Then the qrvey should stay in the same question
			And the Ok button should remain displayed