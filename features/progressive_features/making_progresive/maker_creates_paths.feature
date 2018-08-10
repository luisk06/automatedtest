@todo @incompleted @making @path @progressive

Feature: The user creates paths

	As an user
	I want to add paths to questions
	In order to route specific questions depending on previos answers

	Scenario: The user adds paths to multiple choice question
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user adds a multiple choice question
		When the user adds the answer choices
			And activates the Paths option
		Then the user will see the paths they created below the question as tabs
			And the paths checkbox inside the path question should not be displayed

	Scenario: The user adds paths to Yes/No question
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user adds a Yes/No question
		When activates the Paths option
			And selects Yes/no question to be the path question
		Then the paths checkbox inside the path question should not be displayed

	Scenario: The user creates 10 questions
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user has 9 Yes/No or Multiple choice questions
			And the paths checkboxes are displayed
		When the user adds 1 question
		Then the paths checkbox of all questions should disappear

	Scenario: The user has 10 questions and deletes one
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user has 10 Multiple choice or Yes/No questions
			And the paths checkboxes are not displayed
		When the user removes 1 question
		Then the paths checkboxes of all questions should be displayed

	Scenario: The user has 10 questions and deletes one and then adds an other one
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user has 10 Multiple choice or Yes/No questions
			And the paths checkboxes are not displayed
		When the user removes 1 question
		Then the paths checkboxes of all questions should be displayed

	Scenario: The user creates 1 questions with 9 questions in its path
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user adds a Yes/No question
			And adds a path to the question
			And adds 9 questions in the Yes path
		Then the Go to Share button should appear

	Scenario: The user creates 1 multiple choice question with 6 options with paths and 9 questions in every path
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user adds a Multiple choice question
			And adds 4 more options
			And adds a path to the question
			And adds 9 questions in the Yes path
		Then the Go to Share button should appear