@complete @making @creates_questions @survey @surveyMaking @surveyMakingValidatingMaxCharacters

Feature: Validating max characters on question creation fields

	As an user
	I want to create different type of questions
	In order to help users give me useful information

	Background:
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"

	Scenario: The user creates a question with a title that has more than 160 chars
		When the user tries to writes the "question title" with more than 160 chars
		Then the text will be the first 160 chars of the original written "title"
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a question answer that has more than 120 chars
		When the user tries to writes the "answer of a question" with more than 120 chars
		Then the text will be the first 120 chars of the original written "answer"
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a slider bar question with the left and write text longer than 54 chars
		When the user tries to writes the left and right value with more than 54 chars
		Then the left and write value will be the first 54 chars of the original written left and right values
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly