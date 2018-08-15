@complete @qrvey @validations @headline @qrveyMaker

Feature: The user add an empty text to a webform

	As an user
	I should creates qrveys
	In order to validate the headlines funcionality

	Scenario Outline: The user try creates a text in a <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And the user has added questions
		When the user clicks on the Add button
			And the user clicks on New Text Button
			And the user clicks on publish tab
		Then the user get an error

		Examples:
			| typeOfQrvey     |
			| quiz            |