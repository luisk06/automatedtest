@todo @survey @getQrveyById @surveyMaking

Feature: The user must be enable to access to qrvey through the id in survey

	As an user
	I must be enabled to access to qrvey
	In order to have easy access to it

	Scenario: The user can access to qrvey through the id
		Given the user has "standard" plan
			And the user has login
			And the user has an app
			And the user created the "survey"
		When the user opens the qrvey url with this Id
		Then the name and description qrvey should be displayed