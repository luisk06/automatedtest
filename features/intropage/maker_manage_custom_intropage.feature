@intropage @complete

Feature: Managing the custom intro page

	As an user
	I want to custom intro page
	In order to show a custom information after each webform

	Scenario Outline: the user add a custom intro page to <webform> with <question> question
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<webform>"
			And the user just added "<question>" question
		When the user add a custom intro page
		Then the user publish the webform

		Examples:
			| webform 	 | question 		|
			| survey  	 | date     		|
			| survey  	 | multiple_choice 	|
			| survey  	 | short_text 		|
			| survey  	 | yes_no 			|
			| survey  	 | ranking 			|
			| survey  	 | numeric 			|
			| survey  	 | image 			|
			| survey  	 | rating 			|
			| survey  	 | long_text 		|
			| survey  	 | slidebar 		|
			# | survey  	 | dropdown 		|
			| survey  	 | expression 		|
			| survey  	 | name	 			|
			| survey  	 | email	 		|
			| survey  	 | phone_number		|
			| survey  	 | us_address 		|
			| survey  	 | address 			|
			| survey  	 | password 		|
			| form  	 | date     		|
			| form  	 | multiple_choice 	|
			| form  	 | short_text 		|
			| form  	 | yes_no 			|
			| form  	 | ranking 			|
			| form  	 | numeric 			|
			| form  	 | image 			|
			| form  	 | rating 			|
			| form  	 | long_text 		|
			| form  	 | slidebar 		|
			# | survey  	 | dropdown 		|
			| form  	 | expression 		|
			| form  	 | name	 			|
			| form  	 | email	 		|
			| form  	 | phone_number		|
			| form  	 | us_address 		|
			| form  	 | address 			|
			| form  	 | password 		|
			| quiz 	  	 | date     		|
			| quiz 	  	 | multiple_choice 	|
			| quiz 	  	 | short_text 		|
			| quiz 	  	 | yes_no 			|
			| quiz 	  	 | ranking 			|
			| quiz 	  	 | numeric 			|
			| quiz 	  	 | image 			|
			| checklist  | checklist 		|
			| nps  		 | nps 				|