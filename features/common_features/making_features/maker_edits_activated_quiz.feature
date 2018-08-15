@complete @qrvey @validations @designActivatedQuiz @qrveyMaker

Feature: Trying to edit the design on an activated quiz

	As an user
	I want create a qrvey and activate
	In order to see if the customize can't be edited

	Scenario Outline: The User create an Quiz and try edit it with a <plan> plan
		Given the user has "<plan>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And the user writes the question and answers
			And the user selects the right answer in a "multiple-choice" question
			And the user clicks on publish tab
			And clicks on Activate button in "quiz"
		When the user clicks on design button
			And the user try to open the question on "quiz"
			And the user try edits the question
		Then the question can not be edited

		Examples:
			| plan      |
			| basic     |
			| standard  |