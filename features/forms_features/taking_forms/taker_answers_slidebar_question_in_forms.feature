@taking @complete @slidebar @forms @formsSlidebarTaking @formsTaking

Feature: Answering slidebar question with differents numbers of stops in forms

	As as user
	I want to answer a slidebar question
	In order to express my answer with a slidebar

	@smokeTest3
	Scenario: The user answers a slidebar question with 3 stops
		Given the user has an app
			And the user has a "forms" with a "slide_bar_3" question
		When the user take the qrvey
			And the user selects they stop
			And clicks on Ok
		Then the user should jump to the finished qrvey page

	Scenario Outline: The user answers a slidebar question with <slideStops> stops
		Given the user has an app
			And the user has a "forms" with a "slide_bar_<slideStops>" question
		When the user take the qrvey
			And the user selects they stop
			And clicks on Ok
		Then the user should jump to the finished qrvey page

		Examples:
			| slideStops |
			| 5          |
			| 7          |
			| 9          |