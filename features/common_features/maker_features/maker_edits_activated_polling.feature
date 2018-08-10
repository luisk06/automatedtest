@todo @qrvey @validations @designActivated @designActivatedPolling @qrveyMaker

Feature: The user try to edit the design in an activated webforms in polling

	As an user
	I want create a qrvey and activate
	In order to see if the customize can't be edited

	Scenario Outline: The User create an polling and try edit it with a <plan> plan
		Given the user has "<plan>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "polling"
			And the user writes the question and answers
			And the user clicks outside the section box
			And the user clicks on publish tab
			And clicks on Activate button in "polling"
		When the user clicks on design button
			And the user open the header of "polling"
			And the user try edits the title of "polling"
			And the user try edits the description of "polling"
			And the user clicks on description check
			And the user clicks outside the section box
			And the user opens the question in form
			And the user try edits the question
		Then the customize is not changed

		Examples:
			| plan      |
			| basic     |
			| standard  |