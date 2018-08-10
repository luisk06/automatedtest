@taking @complete @todo @survey @surveyTaking

Feature: Sending answers via email in survey

	As a Taker
	I want to send my email after completing a qrvey
	In order help the qrvey user verify my answers

	Scenario: the user inputs a correct email
		Given the user has an app
			And that there is a qrvey with a date question
			And that the user has answered all required questions
			And that the user has provided an email
		When the user clicks the Done button
		Then the login page should be displayed with username

	Scenario: The user has already send the same email
		Given the user has an app
			And that there is a qrvey with a date question
			And that the user has answered all required questions
			And that the user has provided an email that's already been saved
		When the user clicks the Done button
		Then a "I know you love qrvey, but you already took this one!" chart should be displayed