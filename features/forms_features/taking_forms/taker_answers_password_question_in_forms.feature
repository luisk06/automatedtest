@taking @complete @password @forms @formsTaking @formsPassword

Feature: Answering password question in forms

	As as user
	I want to answer a password question
	In order to express my answer with a password in the question

	Scenario: The user answers password question in forms
		Given the user has an app
			And that the user has a "forms" with "password" question left
		When the user take the qrvey
			And the user selects answers in "password" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

	Scenario: The user answers password question with confirm in forms
		Given the user has an app
			And that the user has a "forms" with "password_confirm" question left
		When the user take the qrvey
			And the user selects answers in "password_confirm" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

	Scenario: The user tries to answer password question with more than maximum characters allowed
		Given the user has an app
			And that the user has a "forms" with "password" question left
		When the user take the qrvey
			And the user type "1234567890123456" on "password" input
			And the user clicks the Ok button
		Then the qrveys stays on same the question

	Scenario: The user tried to answer password question with confirm typing different passwords
		Given the user has an app
			And that the user has a "forms" with "password_confirm" question left
		When the user take the qrvey
			And the user type "passwordtest" on "password" input
			And the user type "passwordtest1" on "confirmpass" input
			And the user clicks the Ok button
		Then the qrveys stays on same the question