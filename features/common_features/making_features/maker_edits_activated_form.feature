@complete @qrvey @validations @designActivated @designActivatedForm @qrveyMaker

Feature: Trying to edit the design on an activated forms

	As an user
	I want create a qrvey and activate
	In order to see if the customize can't be edited

	Scenario Outline: The User create an forms and try edit it with a <plan> plan
		Given the user has "<plan>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And the user has added questions
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user clicks on design button
			And the user open the header of "forms"
			And the user try edits the title of "forms"
			And the user try edits the description of "forms"
			And the user clicks on description check
			And the user opens the question in form
			And the user try edits the question
		Then the qrvey is not changed

		Examples:
			| plan      |
			| basic     |
			| standard  |