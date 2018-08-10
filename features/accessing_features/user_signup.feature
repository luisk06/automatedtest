@accessing @complete @usersignup

Feature: User sing up

	As an User
	I want to sing up to Qrvey
	In order to access its services

	@smokeTest1 @sanityTest
	Scenario: User is not registered
		Given the user filled up all mandatory fields
		When the user hits the Sing me up button
		# Then a confirmation pop up should be displayed
		# And a "Quick Registration = Done!" message should be displayed
		# Then a "create_new" "button" should be displayed on the "dashboard"

	@signupemptydata @todo
	Scenario: User is not registered and no password
		Given the user try register without password
		When the user hits the Sing me up button
		Then a confirmation pop up should be displayed
			And a "Quick Registration = Done!" message should be displayed
			And a Enter Qrvey button should be displayed

	@todo
	Scenario: User is already registered
		Given the user filled up all mandatory fields
		When the user hits the Sing me up button
		Then the User already exists message should be displayed