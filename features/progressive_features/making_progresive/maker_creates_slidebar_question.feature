@todo @making @slidebar @makingSlideBar @progressive

Feature: The user slider bar type question

	As an user
	I want to create a Slider Bar question
	In order for users to answer

	Scenario Outline: The user creates slidebar question with <slideStep> stops in progressive
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "slider bar" question type from the dropdown
		When the user writes the slidebar question
			And selects the number <slideStep>
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| slideStep |
			| 3         |
			| 5         |
			| 7         |
			| 9         |