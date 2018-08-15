@complete @qrvey @validations @designActivated @designActivatedChecklist @qrveyMaker

Feature: Trying to edit the design on an activated checklist

	As an user
	I want create a qrvey and activate
	In order to see if the customize can't be edited

	Scenario Outline: The User create a checklist and try edit it with a <plan> plan
		Given the user has "<plan>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "checklist"
			And the user has added questions
			And the user clicks on publish tab
			And clicks on Activate button in "checklist"
		When the user clicks on design button
			And the user open the header of "checklist"
			And the user try edits the title of "checklist"
			And the user try edits the description of "checklist"
			And the user clicks on description check
			And the user opens the question
			And the user try edits the question
		Then the qrvey is not changed

		Examples:
			| plan      |
			| basic     |
			| standard  |