@taking @complete @numeric @numericTaker @quiz @quizTaking

Feature: Answering numeric question in quiz

	As as user
	I want to answer a numeric question
	In order to express my answer with a specific number

	Scenario Outline: The user answers numeric question with <name> option as <answer> answer
		Given the user has an app
			And the user has a "quiz" with a "numeric" question
		When the user take the qrvey
			And the user writes <answer> in the input
			And the user clicks outside the input numeric field
			And the input has <formatedAns> as answer
			And the user clicks the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page

		Examples:
			| name    | answer              | formatedAns     |
			| general | 00000000            | 0               |
			| general | -1232341            | -1232341        |
			| general | 100980982121122     | 100980982121122 |
			| general | 1232145678909872    | 123214567890987 |
			| general | !"·$%&/(IOP?=)2     | 2               |
			| general | !"·$%&/(IOP?=)-2.76 | -276            |
			| general | 0.0                 | 0               |
			| general | -1                  | -1              |
			| general | -1.0                | -10             |

	Scenario Outline: The user answers numeric question with <name> option as <answer> answer and decimals option on quiz
		Given the user has an app
			And that the user has a "quiz" with a numeric question with <name> option and allow decimals checked
		When the user take the qrvey
			And the user writes <answer> in the input
			And the user clicks outside the input numeric field
			And the user <formatedOnFocus> the numeric input on "quiz"
			And the <formatedOnFocus> input has <formatedAns> as answer on "quiz"
			And the user clicks the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page

		Examples:
			| name    | answer              | formatedAns     | formatedOnFocus |
			| general | .32                 | 0.32            | focus           |
			| general | -.32                | -0.32           | focus           |
			| general | !"·$%&/(IOP?=)-2.76 | -2.76           | focus           |
			| general | 0.0000001           | 1e-7            | focus           |
			| general | 1232145678909872    | 123214567890987 | focus           |
			| general | 3424.3456700000     | 3424.34567      | focus           |
			| general | -1.0                | -1              | focus           |