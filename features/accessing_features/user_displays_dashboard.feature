@todo @accessing @newDashboard

Feature: User access dashboard

	As an user
	I want to access the dashboard of webform
	In order have access to all the features webform offers in one place

  	@noRunOutLocal
	Scenario: the user has no webforms
		Given that the user has no qrveys
		When the user logs in
		Then a "create_new" "button" should be displayed on the "dashboard"
			And a "qrvey" "logo" should be displayed
			And a "created_qrveys" "button" should be displayed
			And a "taken_qrveys" "button" should be displayed
			And a "community" "button" should be displayed
			And a "help" "button" should be displayed
			And a "profile" "image" should be displayed
			And a "qrvey_tips" "panel" should be displayed

  	@smokeTest @userFirst
	Scenario: the user has webforms
		Given that the user has qrveys
		When the user logs in
			And the user clicks on the profile Image
		Then a "create_new" "button" should be displayed on the "dashboard"
			And a "qrvey" "logo" should be displayed
			And a "created_qrveys" "button" should be displayed
			And a "taken_qrveys" "button" should be displayed
			And a "community" "button" should be displayed
			And a "help" "button" should be displayed
			And a "profile" "image" should be displayed
			And a "filter_by_type" "dropdown" should be displayed
			And a "filter_by_state" "dropdown" should be displayed
			And a "sort_by" "dropdown" should be displayed
			And a "search" "input" should be displayed
			And a "qrvey_tips" "panel" should be displayed
			And the list of qrveys should not be empty