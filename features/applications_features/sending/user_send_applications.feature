@complete @applications @sending

Feature: The user send an application

	As an user
	I want to send an application
	In order to share all them that I build it

	Background:
		Given the user has "standard" plan
			And the user has an app
			And the user into the app has 1 "webform"
			And the user into the app has 1 "page"
			And the user into the app has 1 "workflow"
			And the user has login
		When the user is on the app dashboard
			And the user clicks on the application menu
			And the user clicks on the send option

	Scenario: The user verify the modal to send an application
		Then the send application modal should be displayed
			And the application "name" should be displayed
			And the application "name" should be equal
			And the application "description" should be displayed
			And the application "description" should be equal
			And the send button should be disabled

	Scenario: The user want to send an application to valid user with 1 webforms, pages, workflows
			And the user writes an valid email
			And the user clicks on the send button
		Then the send app notify should be displayed

	Scenario: The user want to send an application using an invalid email
			And the user writes an invalid email
			And the user clicks on the send button
		Then the error app notify should be displayed