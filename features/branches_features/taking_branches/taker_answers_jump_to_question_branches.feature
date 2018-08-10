@branches @branchesTaking @branchesJumpToTaking @complete

Feature:  Anwering a jump to question - jump to end branches

	As as user
	I want to be redirected to a question or the end of the survey
	when I'm answering a survey with branches
	In order to follow the flow designed by the user.

	Background:
		Given the user has an app called "Taker Branches jumps"

	@smokeTest1
	Scenario Outline: The user choose an answer leading to a jump-to-question branch in <typeOfQrvey>
			And that the user has a "<typeOfQrvey>" with a jump-to-question branch on a "<typeOfQuestion>" question
		When the user take the qrvey
			And the user selects answers entangled to jump-to-question "<typeOfQuestion>" branch
			And the user clicks the Ok button
		Then the user should jump to a question with title "Please enter a number"

		Examples:
			| typeOfQrvey   | typeOfQuestion  |
			| survey        | yes-no          |
			| survey        | multiple choice |
			| survey        | image           |

	Scenario Outline: The user answers choose an answer to avoid jump to a question branch option in <typeOfQrvey>
			And that the user has a "<typeOfQrvey>" with a jump-to-question branch on a "<typeOfQuestion>" question
		When the user take the qrvey
			And the user selects answers not-entangled to jump-to-question "<typeOfQuestion>" branch
			And the user clicks the Ok button
		Then the user should jump to a question with title "How do you feel today?"

		Examples:
			| typeOfQrvey     | typeOfQuestion  |
			| survey          | multiple choice |
			| survey          | image           |
			| survey          | yes-no          |

	@smokeTest1
	Scenario Outline: The user choose an answer leading to a jump-to-end branch in <typeOfQrvey>
			And that the user has a "<typeOfQrvey>" with a jump-to-end branch
		When the user take the qrvey
			And the user selects answers entangled to jump-to-end branch
			And the user clicks the Ok button
			And the user click submit button on "<typeOfQrvey>"
		Then the user should jump to the finished qrvey page

		Examples:
			| typeOfQrvey     | typeOfQuestion  |
			| survey          | multiple choice |

	Scenario Outline: The user answers choose an answer to avoid jump to a end branch option in <typeOfQrvey>
			And that the user has a "<typeOfQrvey>" with a jump-to-end branch
		When the user take the qrvey
			And the user selects answers not-entangled to jump-to-end branch
			And the user clicks the Ok button
		Then the user should jump to a question with title "How do you feel today?"

		Examples:
			| typeOfQrvey     | typeOfQuestion  |
			| survey          | multiple choice |