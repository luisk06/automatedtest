@todo @making @edit_questions @progressive

Feature: The user edit questions in progressive

	As an user
	I want to be able to edit questions
	from my qrvey

	Scenario: The user edit questions in progressive
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user has added questions and wants to edit them
		When the user clicks on the question
			And the question turns to edit mode
		Then the user will be able to edit the content of the question
			And the question is saved