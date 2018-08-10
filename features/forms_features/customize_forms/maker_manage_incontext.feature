@customize @customizeForms @customizeFormsIncontextView @complete @forms

Feature: Incontext Customize settings on Forms

	As an user
	I want to cutomize the incontext view of my Form
	In order to display a view according to my needs

	Background:
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "forms"

	Scenario Outline: The User displays incontext on <viewOption> position
		When the user clicks on customize button
			And the user clicks on "incontext" view tab
			And the user selects the "<viewOption>" position
		Then the incontext should be displayed on "<viewOption>" position

		Examples:
			| viewOption |
			| left     	 |
			| right    	 |
			| corner   	 |
			| modal    	 |
			| embed    	 |

	Scenario Outline: The User changes incontext label and title on <viewOption> IC position
		When the user clicks on customize button
			And the user clicks on "incontext" view tab
			And user enters "Test Label" as label
			And user enters "Test Tittle" as title
			And the user selects the "<viewOption>" position
		Then the incontext on "<viewOption>" position should contain customized label
			And the incontext on "<viewOption>" position should contain customized title

		Examples:
			| viewOption |
			| left     	 |
			| right    	 |
			| corner   	 |
			| modal    	 |
			| embed    	 |

	Scenario: The user tries to edit customize incontext view settings after activating a Form
		When that the user selects "yes-no" question type from the dropdown
			And the user writes the question
			And the user pass to the "form" share tab
			And clicks on Activate button in "forms"
			And the user clicks on customize button
			And the user closes the edit style alert
			And the user clicks on "incontext" view tab
		Then the customize incontext input for "label" should be disabled
			And the customize incontext input for "title" should be disabled
			And the customize incontext position button for "left" should be disabled
			And the customize incontext position button for "right" should be disabled
			And the customize incontext position button for "corner" should be disabled
			And the customize incontext position button for "modal" should be disabled
			And the customize incontext position button for "embed" should be disabled
			And the trigger time input should be disabled