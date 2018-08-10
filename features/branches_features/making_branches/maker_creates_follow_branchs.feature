@branches @complete @branchesFollowBranch

Feature: Creating branches with follow branch/then end option

	As an user
	I want to create with others questions
	In order to collect extra-info depending on responses

	Scenario Outline: The user creates a <typeOfQuestion> question with branch on a <typeOfQuestion> and <branchsOption> option
		Given the user has "<planName>" plan
			And the user has an app called "User Branch Test"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user creates a question at end
			And the user selects "yes-no" question type for question 2
			And the user fill "yes-no" question options from question 2
			And the user click on question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch tittle"
			And the user selects "<branchsAction>" option 1 on branch 1 from question 1
			And the user selects if answer is "<branchsOption>" in "<typeOfQuestion>"
			And the user selects the 1 answer for "<typeOfQuestion>" option in the 1 box
			And the user fills the 1 question for "<typeOfQuestion>" in the 1 branch
			And the user clicks outside the section box
		Then the question 1 should be saved
			And the question 2 should be saved
			And the jump-to branch 1 from question 1 should be saved
			And the user shoud be able to move to share tab

		Examples:
			| planName 	| typeOfQrvey | typeOfQuestion  | branchsOption 	| branchsAction 	|
			| basic 	| forms	      | multiple choice | equal 			| follow branch		|