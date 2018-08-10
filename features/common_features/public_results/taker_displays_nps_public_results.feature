@publicResults @qrvey @complete @npsPublicResults

Feature: NPS public results

	I want to display the results of the qrvey I just took
	In order to see the public answers.

	Scenario: The user displays public results of a NPS with a <typeOfQuestion> question with <numAnswers> answers
		Given that there is a webform app with a nps question that has 21 answers with the following answers:
			| textfield_answer    |
			| "Some texts"        |
			| "Any word"          |
			| "World thinks"      |
			| "Think in the past" |
			| "Tomorrow"          |
			| "Turn left"         |
			| "Well some text"    |
			| "Writting things"   |
		When the user access public results URL
		Then the analytiq chart for "nps" question on detailed view should be displayed
			And the number answers should be exactly 21