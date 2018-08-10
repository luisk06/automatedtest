@todo @taking @date @progressiveTaking @progressiveTakingDate

Feature: The user answers date question in progressive

	As as user
	I want to answer a date question
	In order to express my answer with a specific date

	Scenario: The user answers the date question in progressive
		Given the user has an app
			And the user has a "progressive" with a "date" question
		When the user selects the date
			And the user removes the datepicker thats blocking the Ok button
			And clicks on the Ok button in "progressive"
		Then the window should be hidden

	@progressiveTakingDateRange
	Scenario Outline: The user answers the date question with <rangeName> range in progressive
		Given the user has an app
			And the user has a "progressive" with "date_with_range_<rangeName>" question left
		When the user selects the date
			And the user removes the datepicker thats blocking the Ok button
			And clicks on the Ok button in "progressive"
		Then the window should be hidden

		Examples:
			| rangeName |
			| before    |
			| after     |
			| between   |