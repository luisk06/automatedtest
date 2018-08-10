@complete @making @uploadImage @survey @smokeTest4 @surveyMaking

Feature: The user creates a upload image question in survey

	As an user
	I want to create a upload image choice question
	In order for users to answer

	@uploadImageMaking
	Scenario Outline: The user creates upload image question type with <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "upload_image" question type from the dropdown
		When the user writes the question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

		Examples:
			| planName 	|
			| basic  	|
			| standard  |