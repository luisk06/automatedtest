@taking @complete @rating @survey @smokeTest5 @surveyTakingRating @surveyTaking

Feature: Answering rating question in survey

	As as user
	I want to answer a rating question
	In order to express my answer in a scale from 1 to 5

	Scenario: The user answers the rating question
		Given the user has an app
			And the user has a "survey" with a "rating" question
		When the user take the qrvey
			And the user selects the amount of stars
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page