@complete @making @password @survey @surveyMaking @surveyMakingPassword

Feature: The user creates a password question in survey

	As an user
	I want to create a password question
	In order for users to answer

	Scenario: The user creates a password question
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "password" question type from the dropdown
		When the user writes the title of question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a password question with custom maximum and minimum values
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "password" question type from the dropdown
		When the user writes the title of question
			And the user set 8 as "minimum" value
			And the user set 20 as "maximum" value
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a password question with confirm password selected
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "password" question type from the dropdown
		When the user writes the title of question
			And the user check confirm password
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a password question with a minimum value lower than allowed
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "password" question type from the dropdown
		When the user writes the title of question
			And the user set 0 as "minimum" value
			And the user clicks on "maximum" input
		Then the "minimum" input should contain 1
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a password question with a minimum value lower than allowed
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "password" question type from the dropdown
		When the user writes the title of question
			And the user set 255 as "maximum" value
			And the user clicks on "minimum" input
		Then the "maximum" input should contain 255
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly