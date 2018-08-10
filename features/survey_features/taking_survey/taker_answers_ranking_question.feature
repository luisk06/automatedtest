@taking @complete @ranking @survey @smokeTest5 @surveyTakingRanking @surveyTaking

Feature: Answering ranking question in survey

	As as user
	I want to answer a Ranking question
	In order to express my answer with raking list

	Scenario: The user answers Ranking question
		Given the user has an app
			And the user has a "survey" with a "ranking" question
		When the user take the qrvey
			And the user reorganize the options
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page