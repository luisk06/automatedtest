@complete @making @images @quiz @quizMaking @quizMakingImages @makingImagesDesktop

Feature: The user creates an image question in quiz

	As an user
	I want to create a image question
	in order for users to see a question with image answer to choose from.

	Background:
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "quiz"
			And that the user selects "image" question type from the dropdown

	@imagesincedesktop
	Scenario: The user creates an image question since Desktop
		When the user writes the title of the question
			And the user adds all images possible to question since "desktop"
			And the user adds all title possible to images
			And the user selects the right answer in a "image" question
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user remove 4 image question as options
		When the user adds 4 images to question
			And the user removes all images possible in the question
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user creates an image question with multiple selection since Desktop
		When the user writes the title of the question
			And the user adds all images possible to question since "desktop"
			And the user adds all title possible to images
			And the user clicks on "allow-multiple_selections" option
			And the user selects the right answer in a "image" question
			And the user clicks outside the section box
		Then the question is saved

	Scenario: The user forgot put title in the image question type since Desktop
		When the user adds all images possible to question since "desktop"
			And the user adds all title possible to images
			And the user selects the right answer in a "image" question
			And the user clicks outside the section box
			And the user try pass to the share tab
		Then the notification should be displayed

	Scenario: The user forgot put images in the image question type
		When the user writes the title of the question
			And the user clicks outside the section box
			And the user try pass to the share tab
		Then the notification should be displayed

	Scenario: The user creates an image question with paths since Desktop
		When the user writes the title of the question
			And the user adds all images possible to question since "desktop"
			And the user adds all title possible to images
			And the user clicks on "add-paths" option
			And the user adds all paths possible in each image
			And the user selects the right answer in a "image" question
			And the user clicks outside the section box
		Then the question is saved