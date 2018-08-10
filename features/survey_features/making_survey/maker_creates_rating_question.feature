@complete @making @rating @survey @smokeTest4 @surveyMaking @surveyMakingRating

Feature: The user creates a rating question in survey

	As an user
	I want to create a rating question
	In order for users to answer

	Scenario: The user creates Rating question type
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "rating" question type from the dropdown
		When the user writes the Rating question
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user creates Rating question type
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "rating" question type from the dropdown
		When the user writes the Rating question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly