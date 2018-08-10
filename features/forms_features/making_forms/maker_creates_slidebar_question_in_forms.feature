@complete @making @slidebar @makingSlideBar @forms @formsMaking

Feature: The user create a slider bar question in forms

	As an user
	I want to create a Slider Bar question
	In order for users to answer

	Background:
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "slider bar" question type from the dropdown
		When the user writes the slidebar question

	@smokeTest2
	Scenario: The user creates a slider bar question with 3 stops in forms with basic plan
			And selects the number 3
			And the user clicks outside the section box
		Then the question is saved

	Scenario Outline: The user creates a slider bar question with <slideStep> stops in forms with basic plan
			And selects the number <slideStep>
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| slideStep |
			| 5         |
			| 7         |
			| 9         |