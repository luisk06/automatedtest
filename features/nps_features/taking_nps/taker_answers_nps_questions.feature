@complete @nps @npsTaker

Feature: Answering NPS

	As an user
	I should answers nps question
	In order to shares

	@smokeTest3
	Scenario: the user answers a nps question
		Given the user has an app
			And that the user has a nps question
		When the user take the qrvey
			And the user answers the "nps" question
			And clicks on the Ok button
			And the user answers the "textfield" question
			And the user clicks the Ok button again
		Then the user should jump to the finished qrvey page