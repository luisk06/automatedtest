@complete @making @edit_questions @survey @surveyMaking

Feature: The user edit questions in survey

	As an user
	I want to be able to edit questions
	from my qrvey

	Scenario Outline: The user edit questions in survey with <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user has added questions and wants to edit them
		When the user clicks on the question
			And the question turns to edit mode
		Then the user will be able to edit the content of the question
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

		Examples:
			| planName 	|
			| basic 	|
			| standard 	|