@complete @applications @tags @navbarLevel1

Feature: The user verify the urls in each section in the navbar of first level

	As an user
	I write a long description

	Scenario Outline: the user verify that <pathUrl> section exists with <planName> plan
		Given the user has "<planName>" plan
			And the user has login
			And the user is in dashboard
		When the user clicks on the "<pathUrl>" in menu first level
		Then the user should is on the "/<pathUrl>" url

		Examples:
			| pathUrl		| planName	|
			| apps 			| basic 	|
			| apps 			| standard 	|
			| configuration	| basic 	|
			| configuration	| standard 	|
			| address_book 	| basic 	|
			| address_book 	| standard 	|
			| profile 		| basic 	|
			| profile 		| standard 	|