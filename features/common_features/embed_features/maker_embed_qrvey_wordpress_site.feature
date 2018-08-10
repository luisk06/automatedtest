@todo @qrvey @making @wordpress @embedQrveys

Feature: Embeding webforms on webforms in wordpress site

	As an user
	I want to embed a qrvey in a wordpress site
	in order to test the plugin functionality

	Scenario Outline: The user embed qrvey in wordpress site in <typeOfQrvey>
		Given the user has an app
			And that the user has a "<typeOfQrvey>" with "multiple_choice" question left for widgets
		When the user opens the "wordpress" dashboard
			And the user makes login into "wordpress" dashboard
			And the user opens the "incontext" widget form in wordpress dashboard
			And the user send the qrvey data and save
			And the user opens the "wordpress" page with embedded qrvey
			And the user selects the desired answer choice in "<typeOfQrvey>"
			And clicks on the Ok button in "<typeOfQrvey>"
		Then the embed window should be hidden

		Examples:
			| typeOfQrvey   |
			| survey  		|
			| forms  		|