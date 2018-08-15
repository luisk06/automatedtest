@preview @todo @survey @surveyPreview

Feature: Diplaying questions's preview on Survey

	As an user
	I want to see the qrvey as an client
	In order to learn from them

	Scenario Outline: The user opens the preview of a <typeOfQuestion> question
		Given that the user stay in the first window
			And the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "<typeOfQuestion>" question type from the dropdown
			And that the user created a "<typeOfQuestion>" question
		When the user open the preview
			And the user change for the preview
			And the user answers the "<typeOfQuestion>" question
			And the user clicks on OK button in the preview
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQuestion    |
			| date              |
			| multiple choice   |
			| slide bar         |
			| numeric           |
			| short_text        |
			| expression        |
			| image             |
			| rating            |
			| ranking           |