@analyticQ @analyzing @date @forms @formsAnalyzing @formsAnalyzingDate @todo

Feature: Applying a filter to sliderbar question in forms summary view

	As an user
	I want see the results of a date question
	In order to analyse the open responses of the users

	Scenario Outline: The user filters the results of a date question with <numAnswers> answers on summary view
		Given that there is a webform app with a "forms" with a "date" question that has <numAnswers> answers with the following dates:
				| dates    |
				| 01/01/01 |
				| 02/02/02 |
				| 03/03/03 |
				| 04/04/04 |
				| 05/05/05 |
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user clicks on the filter button
			And the user clicks on the "<filteredAnswer>" date filter
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the "<filteredAnswer>" date answer filter should appear in the histogram filters
			And the number answers should be more than 0

		Examples:
			| numAnswers | filteredAnswer    | afterFilterAnswers |
			| 8          | 01/01/01          | 2                  |
			| 13         | 02/02/02          | 3                  |
			| 21         | 03/03/03          | 4                  |
			| 34         | 04/04/04          | 7                  |
			| 54         | 05/05/05          | 10                 |