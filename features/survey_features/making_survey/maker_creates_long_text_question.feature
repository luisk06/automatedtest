@complete @making @longText @survey @surveyMaking @surveyMakingLongText

Feature: The user creates a long text question in survey

	As an user
	I want to create a long text question
	In order for users to answer

	Background:
	Given the user has "basic" plan
		And the user has an app
		And the user has login
		And the user opens the just created app
		And the user opens the "webform" board
		And the user created the "survey"
		And that the user selects "long-text" question type from the dropdown

	@smokeTest4 @testFR
	Scenario: The user creates a long text question in qrvey
		When the user writes the title of question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates long text question with less than 160 chars
		When the user writes the long text question with less than 160 chars
			And the user clicks outside the section box
		Then the long-text question should be saved with the exact string the user wrote
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates long text question with more than 160 chars
		When the user writes the long text question with more than 160 chars
			And the user clicks outside the section box
		Then the long text question should be saved with the first 160 chars the user wrote
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly