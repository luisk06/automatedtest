@complete @pages @creatingResultActions

Feature: The user creates new pages with show results action

	As an user
	I want to create actions
	in order of test

	Scenario: The user create a page with Show Results action for survey
		Given the user has "standard" plan
			And that there is a webform app with a "survey" with a "yes-no" question that has 5 answers
			And the user has login
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "show-results" action
			And the user selects the "survey" type in show results
			And the user selects the qrvey in position 1 in show results
			And the user select "tabular" view in "survey"
			And the user clicks on Activate
		Then the page is saved

	Scenario Outline: The user create a page with Show Results action for and delete <typeOfQrvey> with <typeOfView> view
		Given the user has "standard" plan
			And that there is a webform app with a "<typeOfQrvey>" with a "yes-no" question that has 5 answers
			And the user has login
		When the user opened his app on "page-flows"
			And the user create a page
			And the user creates a "show-results" action with "<typeOfQrvey>"
			And the user clicks on Activate
			And the user opened his app on "page-flows"
			And the user delete all the pages
		Then the dashboard of pages is empty

		Examples:
			| typeOfQrvey   | typeOfView |
			| survey        | tabular    |
			| survey        | summary    |
			| survey        | detailed   |
			| nps           | tabular    |
			| nps           | summary    |
			| nps           | detailed   |
			| checklist     | tabular    |
			| checklist     | summary    |
			| checklist     | detailed   |
			| form          | tabular    |