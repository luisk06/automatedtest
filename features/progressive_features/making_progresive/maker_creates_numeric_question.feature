@todo @making @numeric @progressive

Feature: The user creates a numeric question in progressive

	As an user
	I want to create a numeric question
	In order for users to answer

	Scenario: The user creates a numeric question type in progressive
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "numeric" question type from the dropdown
		When the user writes the numeric question and options
			And the user clicks outside the section box
		Then the question is saved

	Scenario Outline: The user creates a numeric question type with <typeOfOption> option in progressive
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "numeric" question type from the dropdown
		When the user writes the numeric question and options
			And the user actives the "<typeOfOption>" option
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| typeOfOption 	|
			| general    	|
			| number     	|
			| currency   	|
			| percentage 	|