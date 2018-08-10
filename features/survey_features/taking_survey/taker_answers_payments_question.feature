@taking @todo @payments @survey @surveyTaking @surveyTakingPayments

Feature: Answering payments question in survey

	As as user
	I want to answer a payments question
	In order to express my answer with a payments in the question

	Scenario: The user answers payments question
		Given the user has an app
			And that the user has a "survey" with "payments" question left
		When the user take the qrvey
			And the user selects answers in "payments" question
			And the user valid the credit card info
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page