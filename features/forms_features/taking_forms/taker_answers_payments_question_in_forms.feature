@taking @todo @payments @forms @formsTaking @formsTakingPayments

Feature: Answering payments question in forms

	As as user
	I want to answer a payments question
	In order to express my answer with a payments in the question

	Scenario: The user answers payments question in forms
		Given the user has an app
			And that the user has a "forms" with "payments" question left
		When the user take the qrvey
			And the user selects answers in "payments" question
			And the user valid the credit card info
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page