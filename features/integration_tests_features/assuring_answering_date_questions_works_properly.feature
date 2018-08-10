@assuring @todo @integration

Feature: Assuring answering date questions works properly

	As an user
	I want to be sure the date questions works properly
	In order to avoid it's repetitive bugs

	Scenario: the user answer a date question by selecting the date in the picker
		Given that there is a qrvey with a date question
			And that the user is answering a date question
			And the Ok button is displayed
		When the user clicks on the input for datepicker
			And the picker is displayed
			And they select the date in the picker
		Then the selected date should be shown in the input
			And the Ok button should remain displayed

	Scenario: the user answers the date question by writing in the input
		Given that the user is answering a date question
			And the Ok button is displayed
		When the user tries to write inside the input
		Then the input should remain empty
			And the Ok button should remain displayed

	Scenario: the user tries to change the readonly html attribute in the input in order to write on it
		Given that the user is answering a date question
			And the Ok button is displayed
		When the user changes the readonly html attribute of the input
			And the user tries to write inside the input
			And the user removes the datepicker thats blocking the Ok button
			And the user clicks the Ok button
		Then the qrvey should stay in the same question

	Scenario: the user clicks on the OK button without picking a date
		Given that the user is answering a date question
			And the Ok button is displayed
		When the user clicks the OK button
		Then the qrvey should stay in the same question
			And the Ok button should remain displayed

	Scenario: the user clicks on the skip question button
		Given that there is a qrvey with an optional date question
			And that the user is answering a date question
			And the Ok button is displayed
		When the user clicks on the skip question button
		Then the qrvey should not be in the same question
			And the next question or the done page should be displayed