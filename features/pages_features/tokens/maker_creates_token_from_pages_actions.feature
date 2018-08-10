@complete @tokens @tokenPagesActions

Feature: The user creates tokens from qrveys loaded from collect data action on pages

	As an user
	I want to add tokens from my qrveys loaded from collect data action for my page
	In order to use its values for insert

	Background:
		Given the user has "standard" plan
			And the user has login
			And the user has an app

	Scenario Outline: The user create tokens loaded from a <qrveyApp> on collect data action
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<qrveyApp>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<qrveyApp>"
		When the user opened his app on "page-flows"
			And the user create a page with "Test token" as title
			And the user opens the actions
			And the user selects the "collect-data" action
			And the user chose "<qrveyApp>" on "collectdata" qrvey type select
			And the user selects qrvey number 1 from the "collectdata" list
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
		Then the token should be added on modal
			And the token should be added after closing modal

		Examples:
			| qrveyApp        |
			| forms           |
			| survey          |

	Scenario: The user tries to create tokens with the same name with values loaded from a survey on collect data action
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
		When the user opened his app on "page-flows"
			And the user create a page with "Test token" as title
			And the user opens the actions
			And the user selects the "collect-data" action
			And the user chose "survey" on "collectdata" qrvey type select
			And the user selects qrvey number 1 from the "collectdata" list
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
		Then the token created alert should be displayed

	Scenario: The user deletes a token loaded from a survey on collect data action
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
		When the user opened his app on "page-flows"
			And the user create a page with "Test token" as title
			And the user opens the actions
			And the user selects the "collect-data" action
			And the user chose "survey" on "collectdata" qrvey type select
			And the user selects qrvey number 1 from the "collectdata" list
			And the user clicks on add token
			And the user selects qrvey 1 on token modal
			And the user selects question 1 on token modal
			And the user fills "testToken" on label
			And the user clicks add on token modal
			And the user clicks on delete token 1
		Then in the panel should not exists this token "testToken"