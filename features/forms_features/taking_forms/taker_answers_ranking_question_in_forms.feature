@taking @complete @ranking @forms @smokeTest3 @formsTakingRanking @formsTaking

Feature: Answering ranking question in forms

	As as user
	I want to answer a Ranking question
	In order to express my answer with raking list

	Scenario: The user answers Ranking question
		Given the user has an app
			And the user has a "forms" with a "ranking" question
		When the user take the qrvey
			And the user reorganize the options
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page