@complete @taking @name @forms @formsTakerNameQuestion @formsTaking

Feature: Answering name question in forms

	As an user
	I want to answers the name question
	In order to send you name

	Scenario: The user answers the name question in forms
		Given the user has an app
			And that the user has a "forms" with "name" question left
		When the user take the qrvey
			And the user selects answers in "name" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page