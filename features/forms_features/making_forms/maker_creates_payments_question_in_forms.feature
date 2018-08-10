@todo @making @payments @forms @formsMaking @formsMakingPayments @smokeTest

Feature: The user creates a payments question in forms

	As an user
	I want to create a payments question
	In order for users to answer

	Scenario: The user creates a payments question in forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "payments" question type from the dropdown
		When the user writes the title of question
			And the user writes the charge amount
			And the user writes the charge that will be made
			And the user clicks outside the section box
		Then the question is saved