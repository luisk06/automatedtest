@branches @complete @optionsBranches @branchesMaking

Feature: Adding more elements outside a branch

	As an user would like adds options to the branchs like headlines and new questions

	@smokeTest1
	Scenario Outline: The user adds new question at end in <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app called "Test User Branch"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
			And that the user selects "multiple choice" question type from the dropdown
			And that the user has a branch in the question number 1
		When the user add a new question below the branch and fills it
		Then all branch should be saved
			And the user shoud be able to move to share tab
			And the webform should be activatable on "<typeOfQrvey>"

		Examples:
			| typeOfQrvey     |
			| survey          |
			| forms	          |

	Scenario Outline: The user adds headline at end in <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app called "Test User Branch"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user is editing a "<typeOfQrvey>" with "Test Branch" as tittle
			And that the user selects "multiple choice" question type from the dropdown
			And that the user has a branch in the question number 1
		When the user add a new headline below the branch and fills it in a "<typeOfQrvey>"
			And the user clicks outside the section box
		Then all branch should be saved

		Examples:
			| typeOfQrvey  |
			| survey       |