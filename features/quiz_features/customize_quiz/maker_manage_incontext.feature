@customize @customizeQuiz @complete

Feature: Customize settings on Quiz

	As an user
	I want to cutomize the incontext view of my Quiz
	In order to display a view according to my needs

	Background:
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "quiz"

	Scenario Outline: The user displays incontext on <viewOption> position
		When the user clicks on customize button
			And the user selects the "<viewOption>" position
		Then the incontext should be displayed on "<viewOption>" position

		Examples:
			| viewOption |
			| left       |
			| right      |
			| corner     |
			| modal      |
			| embed      |

	Scenario Outline: The user changes incontext label and title on <viewOption> IC position
		When the user clicks on customize button
			And user enters "Test Label" as label
			And user enters "Test Tittle" as title
			And the user selects the "<viewOption>" position
		Then the incontext on "<viewOption>" position should contain customized label
			And the incontext on "<viewOption>" position should contain customized title

		Examples:
			| viewOption |
			| left       |
			| right      |
			| corner     |
			| modal      |
			| embed      |

	Scenario: The user tries to edit customize settings after activating a Quiz
		When the user scrolls to top
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user selects the right answer in a "multiple-choice" question
			And the user pass to the "quiz" share tab
			And clicks on Activate button in "quiz"
			And the user clicks on customize button
		Then the customize incontext input for "label" should be disabled
			And the customize incontext input for "title" should be disabled
			And the customize incontext position button for "left" should be disabled
			And the customize incontext position button for "right" should be disabled
			And the customize incontext position button for "corner" should be disabled
			And the customize incontext position button for "modal" should be disabled
			And the customize incontext position button for "embed" should be disabled
			And the trigger time input should be disabled