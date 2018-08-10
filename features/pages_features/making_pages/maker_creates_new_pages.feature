@complete @pages @creatingPages

Feature: The user creates new pages

	As an user
	I want to create pages
	in order of test

	Scenario: The user create a page
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opened his app on "page-flows"
		When the user clicks the "Create Page" button
			And the user writes the page name
			And the user mark the access level as "public"
			And the user writes the page description
			And the user clicks the "Create" button
		Then the page is created