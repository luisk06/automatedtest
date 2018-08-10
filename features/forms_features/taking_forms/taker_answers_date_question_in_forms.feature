@complete @taking @date @forms @formsTaking

Feature: Answering date question in forms

	As as user
	I want to answer a date question
	In order to express my answer

	Scenario: The user answers the date question in forms
		Given the user has an app
			And that the user has a "forms" with "date" question left
		When the user take the qrvey
			And the user selects the date
			And the user removes the datepicker thats blocking the Ok button
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

	@formsTakingDateRange
	Scenario Outline: The user answers the date question with <rangeName> range
		Given the user has an app
			And that the user has a "forms" with "date_with_range_<rangeName>" question left
		When the user take the qrvey
			And the user selects the date
			And the user removes the datepicker thats blocking the Ok button
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page

		Examples:
			| rangeName |
			| before    |
			| after     |
			| between   |