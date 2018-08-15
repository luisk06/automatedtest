@complete @qrvey @validations @editPaused @qrveyMaker

Feature: The user try to edit the design in an paused qrvey

	As an user
	I want create a qrvey and activate
	In order to check the pause and reactivate functions

	Background:
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opened his app on "webforms"

	Scenario Outline: The user create an <qrveyType> and pause it
			And the user created the "<qrveyType>"
			And the user has added questions
			And the user clicks on publish tab
			And clicks on Activate button in "<qrveyType>"
		When the user clicks on Pause button
			And the user reactivate the qrvey
			And the user clicks on design button
			And the user open the header of "<qrveyType>"
		Then the qrvey is not changed

		Examples:
			| qrveyType     |
			| survey        |
			| checklist     |

	@quizTestPause
	Scenario: The user create an quiz and pause it
			And the user created the "quiz"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user selects the right answer in a "multiple-choice" question
			And the user clicks on publish tab
			And clicks on Activate button in "quiz"
		When the user clicks on Pause button
			And the user reactivate the qrvey
			And the user clicks on design button
			And the user open the header of "quiz"
		Then the qrvey is not changed

	@editQuestion
	Scenario: The user create an survey, pause and edit it
			And the user created the "survey"
			And the user has added questions
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
		When the user clicks on Pause button
			And the user clicks on design button
			And the user changes the question title
			And the user clicks on publish tab
			And the user reactivate the qrvey
		Then the question name is changed