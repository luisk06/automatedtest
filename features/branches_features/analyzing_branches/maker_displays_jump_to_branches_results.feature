@branches @branchesAnalyzing @branchesJumpToAnalyzing @complete @analyzing

Feature: Displaying question pannels for jump to question/end branches in summary view

	As an user
	I want to see answers results and the qrvey users interaction with jump-to branches
	In order to collect complete information

  	@smokeTest1
	Scenario Outline: The user displays results of a <typeOfQrvey> with a jump-to-end branch option
		Given the user has a webform app with a "<typeOfQrvey>" with a "jump_to_end" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
		Then a branch button should not be displayed on panel 1
			And there should be 0 responses on panel 2
			And there should be 0 responses on panel 3
			And there should be 25 responses on panel 1

		Examples:
			| typeOfQrvey  |
			| survey       |

	Scenario Outline: The user displays results of a <typeOfQrvey> with a jump-to-question branch option
		Given the user has a webform app with a "<typeOfQrvey>" with a "<typeOfBranch>" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
		Then a branch button should not be displayed on panel 1
			And there should be 0 responses on panel 2
			And there should be 25 responses on panel 3
			And there should be 25 responses on panel 1

		Examples:
			| typeOfQrvey	| typeOfBranch   |
			| survey		| jump_to_image  |
			| survey		| jump_to_mc     |
			| survey		| jump_to_yesno  |