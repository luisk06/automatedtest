@customize @customizeChecklist @complete @checklist

Feature: Customize settings on Checklist

	As an user
	I want to cutomize the incontext view of my Checklist
	In order to display a view according to my needs

	Background:
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "checklist"

	Scenario Outline: The User displays incontext on <viewOption> position
		When the user clicks on customize button
			And the user selects the "<viewOption>" position
		Then the incontext should be displayed on "<viewOption>" position

		Examples:
			| viewOption |
			| left     	 |
			| right    	 |
			| corner     |
			| modal      |
			| embed      |

	Scenario Outline: The User changes incontext label and title on <viewOption> IC position
		When the user clicks on customize button
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

	Scenario: The user tries to edit customize settings after activating a checklist
		When the user fill section title
			And the user fill required options title
			And the user pass to the "checklist" share tab
			And clicks on Activate button in "checklist"
			And the user clicks on customize button
		Then the customize incontext input for "label" should be disabled
			And the customize incontext input for "title" should be disabled
			And the customize incontext position button for "left" should be disabled
			And the customize incontext position button for "right" should be disabled
			And the customize incontext position button for "corner" should be disabled
			And the customize incontext position button for "modal" should be disabled
			And the customize incontext position button for "embed" should be disabled
			And the trigger time input should be disabled