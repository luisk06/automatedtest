@complete @making @digitalSignature @forms @smokeTest @formsMaking

Feature: The user creates a digital signature question in forms

	As an user
	I want to create a digital signature choice question
	In order for users to answer

	@digitalSignatureMaking4
	Scenario Outline: The user creates digital signature question type with <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "digital_signature" question type from the dropdown
		When the user writes the question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly

		Examples:
			| planName 	|
			| basic  	|
			| standard  |