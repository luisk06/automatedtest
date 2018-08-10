@todo @taking @surveyTaking @lookup @survey @formsTakerLookup

Feature: Answering lookup question in survey

	As an user
	I want to answers the lookup question
	In order to send user information

	Scenario Outline: The user answers the lookup question with <lookupType> as option in survey
		Given the user has an app
			And that the user has a "survey" with "lookup_<lookupType>" question left
		When the user take the qrvey
			And the user selects answers in "lookup_<lookupType>" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

    Examples:
		| lookupType  |
		| text    	  |
		| google  	  |
		| webhook 	  |