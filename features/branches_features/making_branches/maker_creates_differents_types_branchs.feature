@branches @complete @branchesMaking @unitBranchs @newBranchs

Feature: Creating branches with different types of questions options

	As an user
	I want to create with others questions
	In order to collect extra-info depending on responses

	Background:
		Given the user has an app called "User Branch Test"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			

	Scenario Outline: The user creates a <typeOfQuestion> single selection question with branch on a <typeOfQuestion> and <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Single selection branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
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
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| survey      | multiple choice | Equal				|
			| forms	      | multiple choice | Does not Equal	|


	Scenario Outline: The user creates a image question with branch on a <typeOfQuestion> and <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Image branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "image" branch option number 1 for branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| survey      | image			| Does not Equal	|
			| forms	      | image			| Equal				|

	Scenario Outline: The user creates a yes-no question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Yes-No branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects the "yes-no" branch option number 1 for branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| survey      | yes-no			| Does not Equal	|
			| forms	      | yes-no			| Equal				|


	Scenario Outline: The user creates a expression question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Expression branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user types "Happy" as text on branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| forms	      | expression		| Contains			|
			| survey      | expression		| Does not contain	|

	Scenario Outline: The user creates a ranking question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Ranking branch"
			And the user selects "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user selects "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| forms	      | ranking			| Does not Equal	|
			| survey      | ranking			| Equal				|

	Scenario Outline: The user creates a short text question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Short Text branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user types "Documentation" as text on branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| forms	      | short text		| Contains			|
			| survey      | short text		| Does not contain	|

	Scenario Outline: The user creates an address question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Address branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user types "Colombia" as text on branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| forms	      | address			| Contains			|
			| survey      | address			| Does not contain	|

	Scenario Outline: The user creates a rating question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Rating branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user choses rating options on for "<branchsOption>" option on branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 			|
			| forms	      | rating			| Equal						|
			| survey      | rating			| Between, inclusive		|
			| forms	      | rating			| Greater than or equal to	|
			| survey      | rating			| Does not Equal			|
			| forms	      | rating			| Less than or equal to		|
	

	Scenario Outline: The user creates a date question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Date branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user select a date for "<branchsOption>" option on branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 			|
			| forms	      | date			| Equal						|
			| survey      | date			| Between, inclusive		|
			| forms	      | date			| Greater than or equal to	|
			| survey      | date			| Does not Equal			|
			| forms	      | date			| Less than or equal to		|

	Scenario Outline: The user creates an email question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Email branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user types "hotmail.com" as text on branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| survey      | email			| Does not contain	|
			| forms	      | email			| Contains			|

	Scenario Outline: The user creates an phone question with branch on using <branchsOption> option
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
		When the user selects "<typeOfQuestion>" question type for question 1
			And the user fill "<typeOfQuestion>" question options from question 1
			And the user add a branch for question 1
			And the user fill branch name 1 for question 1 with "Phone branch"
			And the user select "<branchsOption>" as if-answer-is option for branch 1 level 1 on question 1
			And the user types "300" as text on branch 1 level 1 from question 1
			And the user select "follow" action for branch 1 level 1 on question 1
			And the user fill the branchs number 1 question number 1
			And the user writes the question and answers for question number 2
			And the user clicks outside the section box
		Then the question 1 should be saved
			And all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey | typeOfQuestion  | branchsOption 	|
			| survey      | phone			| Does not contain	|
			| forms	      | phone			| Contains			|
