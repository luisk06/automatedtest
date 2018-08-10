@complete @qrvey @validations @designActivated @designActivatedNps @qrveyMaker

Feature: Trying to edit the design on an activated NPS

	As an user
	I want create a qrvey and activate
	In order to see if the customize can't be edited

	Scenario Outline: The User create an nps and try edit it with a <plan> plan
		Given the user has "<plan>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "nps"
			And the user clicks outside the section box on Not Widget
			And the user writes "Qrvey Co." on enterprise input
			And the user clicks on publish tab
			And clicks on Activate button in "nps"
		When the user clicks on design button
			And the user open the header of "nps"
			And the user try edits the title of "nps"
			And the user try edits the description of "nps"
			And the user edits textarea of nps
		Then the customize is not changed

		Examples:
			| plan      |
			| basic     |
			| standard  |