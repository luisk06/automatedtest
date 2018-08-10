@pages @creatingActionPages @loadWebform

Feature: The user creates page with a load webform action

	As an user
	I want to create actions
	In order of automate tasks

	Scenario Outline: The user create a page with load webform action with <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
		When the user opened his app on "page-flows"
			And the user clicks the "Create Page" button
			And the user writes the page name
			And the user mark the access level as "public"
			And the user writes the page description
			And the user clicks the "Create" button
			And the user opens the actions panel
			And the user selects the type of action as load qrvey
			And the user selects the king of action as "<typeOfQrvey>"
			And the user selects the qrvey 1 of the list of "<typeOfQrvey>"
			And the user clicks on Activate
		Then the page is saved

	Examples:
		| typeOfQrvey  |
		| survey       |
		| forms        |