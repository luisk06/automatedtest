@complete @taking @images @quizTaking @quizTakingImages @quiz

Feature: Answering images question in quiz

	As as user
	I want to answer a qrvey with a image question
	in order to express answer with images

	@smokeTest3
	Scenario: The user answers images question
		Given the user has an app
			And the user has a "quiz" with a "image" question
		When the user take the qrvey
			And the user selects 1 random image answer choice
			And clicks on the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page

	Scenario: The user answers images question with allow multiple selections
		Given the user has an app
			And the user has a "quiz" with a "image_with_allow_multiple_selections" question
		When the user take the qrvey
			And the user selects 15 random image answer choice
			And clicks on the Ok button
			And the user write the email
			And the user clicks the Ok button again
		Then the user should jump to the finished quiz page