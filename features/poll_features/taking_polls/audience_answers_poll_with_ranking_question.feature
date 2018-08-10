@polls @pollsAudienceAnswers @taking @todo @ranking

Feature: Audience answers a poll with ranking question

	As an audience member
	I want to respond the poll
	In order to give the presenter quick feedback

	Scenario Outline: The audience answers a <slideType> the poll on time
		Given the user has an app called "Taker Audience Poll"
			And there is an audience poll with one "<slideType>" poll
			And the presenter has started the poll
		When the audience opens the audience URL
			And the audience inputs the code
			And the user clicks on the "begin_poll" "button" on the "audiencepage"
			And "wrong_poll_code" "message" is not displayed
			And the audience answers the "<slideType>" poll
			And the user clicks the submit button
		Then a "thanks_for_your_response" "message" should be displayed

		Examples:
			| slideType       |
			| ranking         |