@crossTab @todo @analyzing @qrvey

Feature: The user compare differents answers on cross tabulation

	As an user
	I want to compare questions answers
	In order to clarify relations between them

	@smokeTest
	Scenario Outline: The user displays cross tabulation between a <mainQuestionType> and <compareQuestionType> on <typeOfQrvey>
		Given the user has webform app with a "<typeOfQrvey>" with cross tab compatible questions with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user selects "cross" from dropdown on "<typeOfQrvey>"
			And the user selects "<mainQuestionType>" from main dropdown
			And the user selects "<compareQuestionType>" from compare dropdown
		Then cross tabulation table should be displayed
			And the number of crosstab columns should be <numberOfColumns>
			And all cells on cross tab table should not be empty

		Examples:
			| typeOfQrvey     | mainQuestionType | compareQuestionType 	| numberOfColumns |
			| survey          | Multiple Choice  | Image             	| 2				  |
			| survey          | Rating           | Yes - No          	| 5               |
			| progressive     | Yes - No         | Multiple Choice   	| 2               |
			| progressive     | Image            | Rating            	| 2               |

	Scenario Outline: The user add all questions to cross tabulation having a <mainQuestionType> question as main on a <typeOfQrvey>
		Given the user has webform app with a "<typeOfQrvey>" with cross tab compatible questions with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user selects "cross" from dropdown on "<typeOfQrvey>"
			And the user selects "<mainQuestionType>" from main dropdown
			And the user selects add all questions from compare dropdown
		Then cross tabulation table should be displayed
			And the number of questions added to crosstab should be 3
			And all cells on cross tab table should not be empty

		Examples:
			| typeOfQrvey     | mainQuestionType |
			| survey          | Multiple Choice  |
			| survey          | Rating           |
			| progressive     | Yes - No         |
			| progressive     | Image            |

	Scenario Outline: The user remove all questions added to cross tabulation having a <mainQuestionType> question as main on a <typeOfQrvey>
		Given the user has webform app with a "<typeOfQrvey>" with cross tab compatible questions with 40 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user selects "cross" from dropdown on "<typeOfQrvey>"
			And the user selects "<mainQuestionType>" from main dropdown
			And the user selects add all questions from compare dropdown
			And the user selects remove all questions from compare dropdown
		Then cross tabulation table should not be displayed
			And the number of crosstab columns should be 0
			And the number of questions added to crosstab should be 0

		Examples:
			| typeOfQrvey     | mainQuestionType |
			| survey          | Multiple Choice  |
			| survey          | Rating           |
			| progressive     | Yes - No         |
			| progressive     | Image            |