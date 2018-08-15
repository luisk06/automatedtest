@todo @qrvey @making @tumblr @embedQrveys

Feature: Embeding webforms on in tumblr site

	As an user
	I want to embed a qrvey in a tumblr site
	in order to test the plugin functionality

	@tumblr
	Scenario Outline: The user embed webform in tumbrl site
		Given the user has an app
			And that the user has a "<typeOfQrvey>" with "multiple_choice" question left for widgets
		When the user opens the "tumblr" page with embedded qrvey
			And the user take the embedded qrvey
			And the user selects the desired answer choice in "<typeOfQrvey>"
			And clicks on the Ok button
		Then the embed window should be hidden

		Examples:
			| typeOfQrvey    | typeOfQuestion   |
			| survey	  	 | multiple_choice  |
			| forms  		 | multiple_choice  |