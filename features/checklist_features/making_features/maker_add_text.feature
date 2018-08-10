@complete @checklistMaking @checklistAddText @checklist @making

Feature: The user adds text

	As an user
	I want to add text to checklist
	In order to add extra info to sections

	Scenario: The user add a text
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "checklist"
		When the user add a text
			And the user fills text body
			And the user clicks on design button
		Then the text is saved