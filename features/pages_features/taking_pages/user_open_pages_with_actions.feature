@complete @pages @takingPages

Feature: The user open pages with load url actions

	As an user
	I want to create pages with url action
	in order to open sites in my application

	@loadurlTaker
	Scenario: The open a page created with a load URL action
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
		When the user selects the "load-url" action
			And the user fills the url
			And the user clicks on Activate
			And the user activate the main page
			And the user open the project url
		Then the page should show the site saved in the action

	@todo
	Scenario: The update a contact information
			And the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
		When the user selects the "load-url" action
			And the user fills the url
			And the user clicks on Activate
			And the user activate the main page
			And the user open the project url
		Then the page should show the site saved in the action