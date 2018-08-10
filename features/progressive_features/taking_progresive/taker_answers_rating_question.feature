@taking @todo @rating @progressiveTaking

Feature: The user answers rating question

	As as user
	I want to answer a rating question
	In order to express my answer in a scale from 1 to 5

	Scenario: The user answers the rating question
		Given the user has an app
			And the user has a "progressive" with a "rating" question
		When the user answers the "rating" question in the "incontext"
			And clicks on the Ok button in "progressive"
		Then the window should be hidden