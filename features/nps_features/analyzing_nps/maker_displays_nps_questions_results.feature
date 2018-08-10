@analyticQ @analyzing @complete @displays_nps_question_results @nps

Feature: The user applies a filter to the NPS question results

	As an user
	I want see the results of a NPS question
	In order to analyse the open responses of the users

	Scenario Outline: The user filters the results of a nps question with <numAnswers> answers
		Given that there is a webform app with a nps question that has <numAnswers> answers with the following answers:
				| textfield_answer    |
				| "Some texts"        |
				| "Any word"          |
				| "World thinks"      |
				| "Think in the past" |
				| "Tomorrow"          |
				| "Turn left"         |
				| "Well some text"    |
				| "Writting things"   |
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created nps
			And the user clicks on the nps "filter_button" number 1
			And the user clicks on the <filteredAnswer> filter as bar in a "nps" question
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the <filteredAnswer> date answer filter should appear in the histogram filters in the nps
			And the number of answers in the nps should be <afterFilterAnswers>

		Examples:
			| numAnswers | filteredAnswer | afterFilterAnswers |
			| 8          | 2              | 2                  |
			| 13         | 1              | 2                  |
			| 21         | 7              | 5                  |