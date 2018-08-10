@complete @making @email @survey @surveyMaking @surveyMakingEmail

Feature: The user creates an email question in survey

	As an user
	I want to create a email question
	In order for users to answer

	Scenario: The user creates address question type in survey
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "email" question type from the dropdown
		When the user writes the title of question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly