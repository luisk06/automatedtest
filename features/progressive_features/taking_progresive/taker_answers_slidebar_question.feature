@taking @todo @slidebar @progressiveTaking @progressiveTakingSlideBar

Feature: The user answer slidebar question with differents numbers of stops

	As as user
	I want to answer a slidebar question
	In order to express my answer with a slidebar

	Scenario Outline: The user answers a slidebar question with <slideStops> stops
		Given the user has an app
			And the user has a "progressive" with a "slide_bar_<slideStops>" question
		When the user answers the "slidebar" question in the "incontext"
			And clicks on the Ok button in "progressive"
		Then the window should be hidden

		Examples:
			| slideStops |
			| 3          |
			| 5          |
			| 7          |
			| 9          |