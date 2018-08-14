@complete @checklistMaking @checklistSectionCreation @checklist @making

Feature: The user creates sections on checklists

	As an user
	I want to create sections on checklists
	In order to share

	@smokeTest1 @sanityTest
	Scenario: The user create a section
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "checklist"
		When the user fill section title
			And the user fill required options title
			And the user clicks outside the checklist section
		Then the section is saved

	Scenario: The user creates a section with 16 options
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "checklist"
		When the user clicks add option 16 times
		Then the total options should be 15
			And all add buttons must be disabled

	Scenario: The user creates 31 sections
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "checklist"
		When the user adds 31 section
		Then the total of sections should be 32