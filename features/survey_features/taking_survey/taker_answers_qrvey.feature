@taking @complete @survey @smokeTest5 @surveyTaking

Feature: The user answers surveys

	As an user
	I want to take a qrvey
	In order to inform my answers to the qrvey user

	Scenario: There are required question left to answer
		Given the user has an app
			And that there are required questions left unanswered
		When the user clicks the Ok button
		Then the user should not jump to the finish qrvey page

	Scenario: The user answers qrvey
		Given the user has an app
			And that the user has completed all the questions
		Then the user should jump to the finished qrvey page