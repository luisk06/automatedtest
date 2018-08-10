@todo @pages @takingPages

Feature: The user creates new pages

	As an user
	I want to create pages
	in order of test the user

	Background:
		Given the user has "standard" plan
			And the user has login

	Scenario Outline: The user show the results of a <typeOfQrvey> with <typeOfView> view in a page with show results action
		When the user opened his app on "page-flows"
			And the user create a page
			And the user creates a "show-results" action with <typeOfQrvey>
			And the user clicks on Activate
			And the user activate the main page
			And the user clicks the copy project url button
			And the user open the project url
			And the user clicks the first option in the menu
		Then the data is succefully showed

		Examples:
			| typeOfQrvey | typeOfView  |
			| survey      | summary   	|