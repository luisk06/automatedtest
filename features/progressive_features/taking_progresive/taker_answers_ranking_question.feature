@taking @todo @incompleted @ranking @progressiveTaking

Feature: The user answers ranking question

	As as user
	I want to answer a Ranking question
	In order to express my answer with raking list

	Scenario: The user answers Ranking question
		Given the user has an app
			And the user has a "progressive" with a "ranking" question
		When the user reorganize the options
			And clicks on the Ok button in "progressive"
		Then the window should be hidden