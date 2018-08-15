@todo @qrvey @making @wix @embedQrveys

Feature: Embeding webforms on webforms in wix site

	As an user
	I want to embed a webform in a wix site
	in order to test the plugin functionality

	Scenario Outline: The user embed webform in wix site in <typeOfQrvey>
		Given the user has an app
			And that the user has a "<typeOfQrvey>" with "multiple_choice" question left for widgets
		When the user opens the "wix" page with embedded qrvey
			And the user take the embedded qrvey
			And the user selects the desired answer choice in "<typeOfQrvey>"
			And clicks on the Ok button
		Then the embed window should be hidden

		Examples:
			| typeOfQrvey     |
			| survey  		  |
			| forms  		  |