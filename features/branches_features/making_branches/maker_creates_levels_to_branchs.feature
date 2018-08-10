@branches @complete @levelsBranches @branchesMaking @levelsBranchesMaking

Feature: Creating branches with multiple levels

	As an user
	I want to create branches with jump-to actions
	In order to collect extra-info depending on responses

	Background:
		Given the user has an app called "Test User Branch"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board


	Scenario Outline: The user creates a level in branchs on <typeOfQrvey>
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch tittle"
			And the user select "Equal" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			|	typeOfQrvey	|
			|	survey		|
			|	forms		|

	Scenario Outline: The user creates 2 levels in branchs on <typeOfQrvey>
			And that the user is editing a "<typeOfQrvey>" with "Test Levels Branchs" as tittle
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch level 1"
			And the user select "Equal" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user add a branch for branch level 1
			And the user fill branch name for branch level 2 with "Branch level 2"
			And the user select "Equal" as if-answer-is option for branch 1 level 2 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 2 from question 1
			And the user select "follow" action for branch 1 level 2 on question 1
			And the user fill the branchs number 1 question number 2
			And the user writes the question and answers for question number 3
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			|	typeOfQrvey	|
			|	survey		|
			|	forms		|

	Scenario Outline: The user creates 3 levels in branchs on <typeOfQrvey>
			And that the user is editing a "<typeOfQrvey>" with "Test Levels Branchs" as tittle
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch level 1"
			And the user select "Equal" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user add a branch for branch level 1
			And the user fill branch name for branch level 2 with "Branch level 2"
			And the user select "Equal" as if-answer-is option for branch 1 level 2 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 2 from question 1
			And the user select "follow" action for branch 1 level 2 on question 1
			And the user fill the branchs number 1 question number 2
			And the user writes the question and answers for question number 3
			And the user add a branch for branch level 2
			And the user fill branch name for branch level 3 with "Branch level 3"
			And the user select "Equal" as if-answer-is option for branch 1 level 3 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 3 from question 1
			And the user select "follow" action for branch 1 level 3 on question 1
			And the user fill the branchs number 1 question number 3
			And the user writes the question and answers for question number 4
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			|	typeOfQrvey	|
			|	survey		|
			|	forms		|

	Scenario Outline: The user creates 4 levels in branchs on <typeOfQrvey>
			And that the user is editing a "<typeOfQrvey>" with "Test Levels Branchs" as tittle
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch level 1"
			And the user select "Equal" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user add a branch for branch level 1
			And the user fill branch name for branch level 2 with "Branch level 2"
			And the user select "Equal" as if-answer-is option for branch 1 level 2 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 2 from question 1
			And the user select "follow" action for branch 1 level 2 on question 1
			And the user fill the branchs number 1 question number 2
			And the user writes the question and answers for question number 3
			And the user add a branch for branch level 2
			And the user fill branch name for branch level 3 with "Branch level 3"
			And the user select "Equal" as if-answer-is option for branch 1 level 3 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 3 from question 1
			And the user select "follow" action for branch 1 level 3 on question 1
			And the user fill the branchs number 1 question number 3
			And the user writes the question and answers for question number 4
			And the user add a branch for branch level 3
			And the user fill branch name for branch level 4 with "Branch level 4"
			And the user select "Equal" as if-answer-is option for branch 1 level 4 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 4 from question 1
			And the user select "follow" action for branch 1 level 4 on question 1
			And the user fill the branchs number 1 question number 4
			And the user writes the question and answers for question number 5
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			|	typeOfQrvey	|
			|	survey		|
			|	forms		|

	@smokeTest1 @sanityTest
	Scenario Outline: The user creates 5 levels in branchs on <typeOfQrvey>
			And that the user is editing a "<typeOfQrvey>" with "Test Levels Branchs" as tittle
			And that the user selects "multiple choice" question type from the dropdown
		When the user writes the question and answers
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Branch level 1"
			And the user select "Equal" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user add a branch for branch level 1
			And the user fill branch name for branch level 2 with "Branch level 2"
			And the user select "Equal" as if-answer-is option for branch 1 level 2 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 2 from question 1
			And the user select "follow" action for branch 1 level 2 on question 1
			And the user fill the branchs number 1 question number 2
			And the user writes the question and answers for question number 3
			And the user add a branch for branch level 2
			And the user fill branch name for branch level 3 with "Branch level 3"
			And the user select "Equal" as if-answer-is option for branch 1 level 3 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 3 from question 1
			And the user select "follow" action for branch 1 level 3 on question 1
			And the user fill the branchs number 1 question number 3
			And the user writes the question and answers for question number 4
			And the user add a branch for branch level 3
			And the user fill branch name for branch level 4 with "Branch level 4"
			And the user select "Equal" as if-answer-is option for branch 1 level 4 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 4 from question 1
			And the user select "follow" action for branch 1 level 4 on question 1
			And the user fill the branchs number 1 question number 4
			And the user writes the question and answers for question number 5
			And the user add a branch for branch level 4
			And the user fill branch name for branch level 5 with "Branch level 5"
			And the user select "Equal" as if-answer-is option for branch 1 level 5 on question 1
			And the user selects the "single-selection" branch option number 1 for branch 1 level 5 from question 1
			And the user select "follow" action for branch 1 level 5 on question 1
			And the user fill the branchs number 1 question number 5
			And the user writes the question and answers for question number 6
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			|	typeOfQrvey	|
			|	survey		|
			|	forms		|