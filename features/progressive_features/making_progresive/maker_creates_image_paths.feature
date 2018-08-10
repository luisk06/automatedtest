@todo @incompleted @making

Feature: The user creates image questions with paths in progressive

	As an user
	I want to create a image question with paths
	in order for users to see a question with image answer to choose from.

	Background:
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "image" question type from the dropdown
			And the user writes the title of the question
			And the user adds all images to question since "desktop"
			And the user adds all title to images

	Scenario: The user creates a image question with multiple choice path
		When activates the Paths option
			And selects your question to be the path question
			And the user clicks on the "Share your qrvey" option
		Then the "There are incomplete questions/answers on your qrvey, please review" error should be displayed
			And the user clicks on "Activate" button