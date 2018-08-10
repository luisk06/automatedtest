@complete @taking @formsTaking @lookup @forms @formsTakerLookupQuestion

Feature: Answering lookup question in forms

	As an user
	I want to answers the lookup question
	In order to send user information

	Scenario Outline: The user answers the <lookupType> in forms
		Given the user has an app
			And that the user has a "forms" with "<lookupType>" question left
		When the user take the qrvey
			And the user selects answers in "<lookupType>" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

		Examples:
			| lookupText     						| lookupType     |
			| lookup question with text option  	| lookup_text    |
			| lookup question with google option  	| lookup_google  |
			| lookup question with webhook option 	| lookup_webhook |