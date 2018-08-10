@complete @making @manages_questions @survey @surveyMaking @surveyMakingManageQuestions

Feature: Creating multiple questions on survey

	As an user
	I want to add and remove questions
	In order to complete my qrvey

	Scenario: The qrvey has less than 9 questions
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the qrvey has less than 9 questions
		When the user clicks Add Questions
		Then new question charts should be displayed