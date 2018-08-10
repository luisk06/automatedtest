@complete @making @quiz @quizMaking @quizMakingScore @all

Feature: The user manage the score option in quiz

	As an user
	I want to create some questions
	In order to manage the score option

	Scenario: The user active the score option without score
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user selects "yes-no" question type from the dropdown
		When the user writes the question
			And the user writes the "yes-no" question options
			And the user selects the right answer in a "yes-no" question
			And the user clicks outside the section box
			And the user opens the score box
			And the user clicks on the score check
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly
	
	Scenario: The user active the score option with score
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user selects "yes-no" question type from the dropdown
		When the user writes the question
			And the user writes the "yes-no" question options
			And the user selects the right answer in a "yes-no" question
			And the user clicks outside the section box
			And the user opens the score box
			And the user clicks on the score check
			And the user puts the max score
			And the user puts the message of "pass" field
			And the user puts the message of "fail" field
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly