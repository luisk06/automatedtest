@analyticQ @analyzing @progressive @analyzingImage @todo @progressiveAnalizing

Feature: The user displays image question results in progressive

	As an user
	I want see the results of an image question
	In order to analyse them

	Scenario Outline: The user filters the results by the different answers on progressive webform
		Given that there is a webform app with a "progressive" with a "image" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user clicks on the filter button
			And the user clicks on the "<filteredAnswer>" filter as image
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" image answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer     |
			| 15         | jon_snow           |
			| 22         | tyrion_lannister   |
			| 34         | daenerys_targaryen |
			| 46         | arya_stark         |
			| 57         | ghost              |