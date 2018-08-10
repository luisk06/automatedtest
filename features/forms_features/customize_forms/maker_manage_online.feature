@customize @customizeForms @customizeFormsOnlineView @complete

Feature: Online view Customize settings on Forms

	As an user
	I want to cutomize the online view of my Form
	In order to display a view according to my needs

	Background:
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "forms"

	Scenario Outline: The user displays online view with on <columnNumber> column
		When the user clicks on customize button
			And the user clicks on "online" view tab
			And the user selects the "<columnNumber>" column layout
		Then the online view should be displayed with "<columnNumber>" column

		Examples:
			| columnNumber 	|
			| one        	|
			| two        	|

	Scenario Outline: The User displays online view with on <label> label
		When the user clicks on customize button
			And the user clicks on "online" view tab
			And the user selects "<label>" label
		Then the online view should be displayed with "<label>" label

		Examples:
			| label |
			| top   |
			| left  |

	Scenario: The user tries to edit customize online view settings after activating a Form
		When that the user selects "yes-no" question type from the dropdown
			And the user writes the question
			And the user pass to the "form" share tab
			And clicks on Activate button in "forms"
			And the user clicks on customize button
			And the user closes the edit style alert
			And the user clicks on "online" view tab
		Then the customize online view option for "label-top" should be disabled
			And the customize online view option for "label-left" should be disabled
			And the customize online view option for "column-one" should be disabled
			And the customize online view option for "column-two" should be disabled