@todo @deprecated @taking @questionnaireTaking @lookup @questionnaire @questionnaireTakerLookupQuestion

Feature: The user answers address question in questionnaire

	As an user
	I want to answers the lookup question
	In order to send user information

	Scenario Outline: The user answers the lookup question with <lookupType> as option in questionnaire
		Given the user has an app
			And that the user has a "questionnaire" with "lookup_<lookupType>" question left
		When the user take the qrvey
			And the user selects answers in "lookup_<lookupType>" question
			And the user clicks the Ok button
			And the user clicks on the Submit button
		Then the user should jump to the finished qrvey page

		Examples:
			| lookupType |
			| text    	 |
			| google  	 |
			| webhook 	 |