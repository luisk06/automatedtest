@todo @qrvey @making @squarespace @embedQrveys

Feature: Embeding webforms on squarespace site

	As an user
	I want to embed a qrvey in a squarespace site
	in order to test the plugin functionality

	Scenario Outline: The user embed a "<typeOfQrvey>" in squarespace site
		Given the user has an app
			And that the user has a "<typeOfQrvey>" with "multiple_choice" question left for widgets
		When the user opens the "squarespace" page with embedded qrvey
			And the user take the embedded qrvey
			And the user selects the desired answer choice in "<typeOfQrvey>"
			And clicks on the Ok button
		Then the embed window should be hidden

		Examples:
			| typeOfQrvey    | typeOfQuestion   |
			| survey  	 	 | multiple_choice  |
			| forms  		 | multiple_choice  |