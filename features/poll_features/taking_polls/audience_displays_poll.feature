@polls @pollsAudienceDisplayed @taking @todo

Feature: audience displays poll

	As an audience member
	I want to see the poll
	In order to understand what i'm being asked for

	Scenario Outline: The presenter has started the poll with slide <slideType> type
		Given the user has an app called "Taker Audience Poll"
			And there is an audience poll with one "<slideType>" poll
			And the presenter has started the poll
		When the audience opens the audience URL
			And the audience inputs the code
			And the user clicks on the "begin_poll" "button" on the "audiencepage"
		Then a "wrong_poll_code" "message" should not be displayed
			And a "<slideType>" poll should be displayed

		Examples:
			| slideType       |
			| multiple_choice |
			| rating          |
			| numeric         |
			| yes_no          |
			| ranking         |
			| slide_bar       |
			| expression      |

	Scenario: the audience inputs a wrong code
		Given the user has an app
			And there is a poll
			And the presenter has started the poll
		When the audience opens the audience URL
			And the audience inputs a wrong code
			And the user clicks on the "begin_poll" "button" on the "audiencepage"
		Then a "wrong_poll_code" "message" should be displayed