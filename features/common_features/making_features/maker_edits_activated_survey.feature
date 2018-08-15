@complete @qrvey @validations @designActivated @designActivatedSurvey @qrveyMaker

Feature: Trying to edit the design on an activated survey

	As an user
	I want create a qrvey and activate
	In order to see if the customize can't be edited

	Scenario Outline: The User create an Survey and try edit it with a <plan> plan
		Given the user has "<plan>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And the user has added questions
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
		When the user clicks on design button
			And the user try to click outside the section box
			And the user try to open the question on "survey"
			And the user try edits the question
		Then the qrvey is not changed

		Examples:
			| plan      |
			| basic     |
			| standard  |