@complete @taking @images @surveyTaking @surveyTakingImages @survey

Feature: Answering images question in survey

	As as user
	I want to answer a qrvey with a image question
	in order to express answer with images

	@smokeTest5
	Scenario: The user answers images question
		Given the user has an app
			And the user has a "survey" with a "image" question
		When the user take the qrvey
			And the user selects 1 random image answer choice
			And clicks on the Ok button
		Then the user should jump to the finished qrvey page

	Scenario: The user answers images question with allow multiple selections
		Given the user has an app
			And the user has a "survey" with a "image_with_allow_multiple_selections" question
		When the user take the qrvey
			And the user selects 15 random image answer choice
			And the user scrolls to bottom
			And clicks on the Ok button
		Then the user should jump to the finished qrvey page