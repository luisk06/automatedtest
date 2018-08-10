@branches @complete @branchesJumpTo

Feature: Creating branches with jump to question/end option

	As an user
	I want to create branches with jump-to actions
	In order to collect extra-info depending on responses

	Scenario Outline: The user creates a branch on a <typeOfQuestion> with jump to <typeOfQuestionToJump> question on <typeOfQrvey>
		Given the user has an app called "Test User Branch"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user creates a question at end
			And the user selects "<typeOfQuestionToJump>" question type for question 2
			And the user fill "<typeOfQuestionToJump>" question options from question 2
			And the user click on question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch tittle"
			And the user selects "jump to" option 1 on branch 1 from question 1
			And the user select "Equal" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 1 from question 1
			And the user clicks outside the section box
		Then the question 1 should be saved
			And the question 2 should be saved
			And the jump-to branch 1 from question 1 should be saved
			And the user shoud be able to move to share tab

		Examples:
			| typeOfQrvey     | typeOfQuestion  | typeOfQuestionToJump	|
			| survey          | multiple choice | image              	|
			| survey          | multiple choice | numeric            	|
			| survey          | multiple choice | expression         	|
			| survey          | multiple choice | slide bar          	|
			| survey          | image           | date               	|
			| survey          | image           | ranking            	|
			| survey          | image           | yes-no             	|
			| survey          | image           | long-text          	|
			| survey          | yes-no          | short text         	|
			| survey          | yes-no          | rating             	|
			| survey          | yes-no          | multiple choice    	|

	Scenario Outline: The user creates a branch on a <typeOfQrvey> with a <typeOfQuestion> question with jump to end
		Given the user has an app called "Test User Branch"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user creates a question at end
			And the user selects "<typeOfQuestionToJump>" question type for question 2
			And the user fill "<typeOfQuestionToJump>" question options from question 2
			And the user click on question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch tittle"
			And the user selects jump to end on branch 1 from question 1
			And the user select "Equal" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 1 from question 1
			And the user clicks outside the section box
		Then the question 1 should be saved
			And the question 2 should be saved
			And the jump-to branch 1 from question 1 should be saved
			And the user shoud be able to move to share tab

		Examples:
			| typeOfQrvey     | typeOfQuestion  | typeOfQuestionToJump	|
			| survey          | multiple choice | image              	|
			| survey          | image           | ranking            	|
			| survey          | yes-no          | multiple choice    	|