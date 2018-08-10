@complete @branches @levelsBranches @levelsBranchesAnalyzing @Analize @branchesAnalyzing

Feature: Displaying multiple levels branch question pannels on summary view

	As an user
	I want to answers branches with differents actions
	In order to collect extra-info depending on responses

	Scenario Outline: The user displays an answer in a <typeOfQrvey> with 1 level branches on Summary view
		Given the user has a webform app with a "<typeOfQrvey>" with a "level1" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
		Then a level 1 branch must be showed
			And the branch level 1 should have 25 answers

		Examples:
			| typeOfQrvey     |
			| survey          |

	@levelsTestingAN
	Scenario Outline: The user displays an answer in a <typeOfQrvey> with 2 level branches on Summary view
		Given the user has a webform app with a "<typeOfQrvey>" with a "level2" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And the user opens created branches of level 2
		Then a level 2 branch must be showed
			And the branch level 2 should have 25 answers

		Examples:
			| typeOfQrvey |
			| survey      |

	Scenario Outline: The user displays an answer in a <typeOfQrvey> with 3 level branches on Summary view
		Given the user has a webform app with a "<typeOfQrvey>" with a "level3" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And the user opens created branches of level 2
			And the user opens created branches of level 3
		Then a level 3 branch must be showed
			And the branch level 3 should have 25 answers

		Examples:
			| typeOfQrvey | typeOfQuestion    |
			| survey      | "multiple choice" |

	Scenario Outline: The user displays an answer in a <typeOfQrvey> with 4 level branches on Summary view
		Given the user has a webform app with a "<typeOfQrvey>" with a "level4" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And the user opens created branches of level 2
			And the user opens created branches of level 3
			And the user opens created branches of level 4
		Then a level 4 branch must be showed
			And the branch level 4 should have 25 answers

		Examples:
			| typeOfQrvey |
			| survey      |

	@smokeTest1 @sanityTest
	Scenario Outline: The user displays an answer in a <typeOfQrvey> with 5 level branches on Summary view
		Given the user has a webform app with a "<typeOfQrvey>" with a "level5" branch with 25 responses
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user opens created branches of level 1
			And the user opens created branches of level 2
			And the user opens created branches of level 3
			And the user opens created branches of level 4
			And the user opens created branches of level 5
		Then a level 5 branch must be showed
			And the branch level 5 should have 25 answers

		Examples:
			| typeOfQrvey |
			| survey      |