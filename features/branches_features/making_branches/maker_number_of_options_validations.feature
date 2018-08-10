@branches @todo @branchesOptionsValidations @branchesMaking

Feature: Branches number limitations

	As an user
	I can only add branches to a question depending on the number of options the question have

	Background:
		Given the user has an app called "Test User Branch"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board

	Scenario Outline: The user tries to add <numbersOfBranch> branches to a <typeOfQuestion> question with <numberOfOptions> options on <typeOfQrvey> app
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user adds and fills <numberOfOptions> options on "<typeOfQuestion>" question to question 1
			And the user adds <numbersOfBranch> branches to question 1
		Then the add branch link on question 1 should be disabled
			And the total of branches on question 1 should be <numberOfOptions>

		Examples:
			| typeOfQrvey     | typeOfQuestion  | numbersOfBranch | numberOfOptions |
			| survey          | multiple choice | 16              | 15              |

	Scenario Outline: The user adds a branch with <numberOfOptions> if-answers options on a <typeOfQuestion> question with <numberOfOptions> options on <typeOfQrvey> app
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user adds and fills <numberOfOptions> options on "<typeOfQuestion>" question to question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch tittle"
		Then the total of if-answers options on branch 1 from question 1 should be <numberOfOptions> on "<typeOfQuestion>" type
			And the user can only add <numberOfOptions> if-answers options on branch 1 from question 1 on "<typeOfQuestion>" type

		Examples:
			| typeOfQrvey     | typeOfQuestion  | numberOfOptions |
			| survey          | multiple choice | 15              |

	Scenario Outline: The user tries to select the same if-answer option on a branch created to a <typeOfQuestion> question <typeOfQrvey> app
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch tittle"
			And the user select if-answer option number 1 on branch 1 from question 1
			And the user add another if-answer option on branch 1 from question 1
		Then the option 1 on if-answer dropdown 2 on branch 1 from question 1 should be disabled

		Examples:
			| typeOfQrvey   | typeOfQuestion  |
			| "survey"    | "multiple choice" |