@polls @pollsPresenter @taking @todo

Feature: Presenter shows poll

	As a presenter
	I want to show my poll
	In order to get responses from the audience

	Background:
		Given the user has an app
			And there is a poll
			And the user has login
			And the presenter opens the poll url

	@smokeTest
	Scenario: The poll doesn't have any answers
		When the poll gets an answer
		Then a "poll_results" "graphic" should be displayed on the "polling_presenter" as a svg

	Scenario: The slide has answers
		When the poll gets an answer
		Then the number of answers should be 1 more

	Scenario: the next poll is loaded
		When the next poll is loaded
		Then a "waiting_for_responses" "message" should be displayed