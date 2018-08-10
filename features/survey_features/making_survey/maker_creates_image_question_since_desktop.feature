@complete @making @images @survey @makingImages @makingImagesDesktop @surveyMakingImagesDesktop @surveyMaking

Feature: The user creates an image question since desktop in survey

	As an user
	I want to create an image question
	in order for users to see a question with image answer to choose from.

	Background:
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "survey"
			And that the user selects "image" question type from the dropdown

	@surveyMakingImagesDesktopSmokeTest
	Scenario: The user creates a image question since Desktop
		When the user writes the title of the question
			And the user adds all images possible to question since "desktop"
			And the user adds all title possible to images
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user remove 4 image question as options
		When the user adds 4 images to question
			And the user removes all images possible in the question
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a image question with multiple selection since Desktop
		When the user writes the title of the question
			And the user adds all images possible to question since "desktop"
			And the user adds all title possible to images
			And the user clicks on "allow-multiple_selections" option
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user forgot put title in the image question type since Desktop
		When the user adds all images possible to question since "desktop"
			And the user adds all title possible to images
			And the user clicks outside the section box
			And the user try pass to the share tab
		Then the notification should be displayed
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user forgot put images in the image question type
		When the user writes the title of the question
			And the user clicks outside the section box
			And the user try pass to the share tab
		Then the notification should be displayed
			And the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly

	Scenario: The user creates a image question with paths since Desktop
		When the user writes the title of the question
			And the user adds all images possible to question since "desktop"
			And the user adds all title possible to images
			And the user clicks on "add-paths" option
			And the user adds all paths possible in each image
			And the user clicks outside the section box
		Then the question is saved
			And the publish page is show correctly
			And the webform should be activated correctly