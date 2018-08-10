@todo @making @manages_questions @progressive

Feature: The user manages questions

	As an user
	I want to add and remove questions
	In order to complete my qrvey

	Scenario: The qrvey has less than 9 questions
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the qrvey has less than 9 questions
		When the user clicks Add Questions
		Then new question charts should be displayed

	Scenario: The qrvey has 9 questions
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the qrvey has 9 questions
		When the user clicks Add Questions
		Then the Go to Share button should appear

	@manages_questions_remove @todo
	Scenario: the qrvey has 10 questions
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the qrvey has less than 9 questions
		When the user removes questions
		Then the Add Questions button should appear