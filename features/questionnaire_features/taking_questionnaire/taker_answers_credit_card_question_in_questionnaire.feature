@todo @deprecated @taking @password @questionnaire @questionnaireTaking @qTakingCreditCard

Feature: The user answers long text question in questionnaire

	As as user
	I want to answer a password question
	In order to express my answer with a password in the question

	Scenario: The user answers password question in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "credit_card" question left
		When the user take the qrvey
			And the user writes your credit card info
			And the user clicks the Ok button for credit card
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page