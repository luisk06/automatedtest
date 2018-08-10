@complete @pages @creatingNavbar

Feature: The user creates new pages and use the navbar

	As an user
	I want to create actions
	in order of test

	Background:
		Given the user has "standard" plan
			And the user has an app
			And the user was subscribed
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "survey"
		When the user opened his app on "page-flows"

	Scenario: The user create a page with show message action
			And the user clicks the "Create Page" button
			And the user writes the page name
			And the user mark the access level as "public"
			And the user writes the page description
			And the user clicks the "Create" button
			And the user opens the actions
			And the user selects the "showmsg" action
			And the user writes the message
			And the user clicks on Activate
			And the user clicks on Slide Active page
		Then the navbar should have 1 tab

	Scenario: The user create a page with show message action
			And the user clicks the "Create Page" button
			And the user writes the page name
			And the user mark the access level as "public"
			And the user writes the page description
			And the user clicks the "Create" button
			And the user opens the actions
			And the user selects the "showmsg" action
			And the user writes the message
			And the user clicks on Activate
			And the user clicks on Slide Active page
		Then the navbar should have 1 tab
			And the page should set star page

	Scenario: The user create a sign up page
			And the user has sign up form
			And the user has a "showmsg" page
		When the user clicks on Authentificacions button
			And the user opens the dropdown
			And the user selects the sign up form
			And the user selects the fields for the login form
			And the user selects the logout page
			And the user clicks on Publish
		Then the x button should be displayed