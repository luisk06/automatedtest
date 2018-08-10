@branches @onWork @levelsBranches @levelsBranchesTaking @taking @branchesTaking

Feature: Answering branches with multiple levels

	As an user
	I want to answers branches with differents actions
	In order to collect extra-info depending on responses

	Background:
		Given the user has an app called "Taker Branches levels"

	Scenario Outline: The user answers a question with a branch on level 1 on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 1
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 2 option on level 1
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	Scenario Outline: The user answers a question with a branch on level 1 and select the option without branchon; on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 1
		When the user take the qrvey
			And the user selects 2 option on level 0
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	Scenario Outline: The user answers a question with a branch on level 2 on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 2
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 1 option on level 1
			And the user selects 2 option on level 2
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	Scenario Outline: The user answers a question with a branch on level 2 and select the option without branchon; on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 2
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 2 option on level 1
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	Scenario Outline: The user answers a question with a branch on level 3 on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 3
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 1 option on level 1
			And the user selects 1 option on level 2
			And the user selects 2 option on level 3
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	Scenario Outline: The user answers a question with a branch on level 3 and select the option without branchon; on <typeOfQrvey>
		Given the user has a branch in "<typeOfQrvey>" of level 3
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 1 option on level 1
			And the user selects 2 option on level 2
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	Scenario Outline: The user answers a question with a branch on level 4 on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 4
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 1 option on level 1
			And the user selects 1 option on level 2
			And the user selects 1 option on level 3
			And the user selects 2 option on level 4
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	Scenario Outline: The user answers a question with a branch on level 4 and select the option without branchon; on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 4
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 1 option on level 1
			And the user selects 1 option on level 2
			And the user selects 2 option on level 3
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	@testingBranchAlone @smokeTest1 @sanityTest
	Scenario Outline: The user answers a question with a branch on level 5 on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 5
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 1 option on level 1
			And the user selects 1 option on level 2
			And the user selects 1 option on level 3
			And the user selects 1 option on level 4
			And the user selects 2 option on level 5
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |

	Scenario Outline: The user answers a question with a branch on level 5 and select the option without branchon; on <typeOfQrvey>
			And the user has a branch in "<typeOfQrvey>" of level 5
		When the user take the qrvey
			And the user selects 1 option on level 0
			And the user selects 1 option on level 1
			And the user selects 1 option on level 2
			And the user selects 1 option on level 3
			And the user selects 2 option on level 4
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     |
			| survey          |