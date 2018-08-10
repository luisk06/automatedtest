@todo @payments @analyzing @formsAnalyzing @formsAnalyzingPayments @smokeTest

Feature: Applying a filter to a payments question in forms summary view

	As an user
	I want to view the sum of charge amount in all answers
	In order to know how much I have been paid

	Scenario Outline: The user filters the results of a payment question with a charge amount of <filteredAnswer>USD
		Given that there is a webform app with a "forms" with a "payments" question that has <numAnswers> answers
			And the user is logged in
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the "qrvey_results" "button" of the just created qrvey
			And the user go to the Summary View
			And the user clicks on the filter button
			And the user clicks on the <afterFilterAnswers> filter
			And the user clicks on the "apply_filter" "button"
			And the user clicks on the "filters" "button"
		Then the number answers should be more than 0
			And the charge amount in total should be <totalAmount> USD

		Examples:
			| numAnswers | filteredAnswer | afterFilterAnswers | totalAmount  	|
			| 80         | 100            | 1                  | 8000 	  		|
			| 21         | 100            | 1                  | 2100 	  		|