@todo @making @images @progressive @makingImages

Feature: The user creates image question in progressive

	As an user
	I want to create a image question
	in order for users to see a question with image answer to choose from.

	Background:
		Given the user has login
			And the user has an app
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user selects "image" question type from the dropdown

	Scenario Outline: The user creates a image question since <type> in progressive
		When the user writes the title of the question
			And the user adds all images possible to question since "<type>"
			And the user adds all title possible to images
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| type     |
			| url      |
			| desktop  |

	Scenario: The user remove 4 image question as options in progressive
		When the user adds 4 images to question
			And the user removes all images possible in the question
			And the user clicks outside the section box
		Then the question is saved

	Scenario Outline: The user creates a image question with multiple selection since <type> in progressive
		When the user writes the title of the question
			And the user adds all images possible to question since "<type>"
			And the user adds all title possible to images
			And the user clicks on "allow-multiple_selections" option
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| type     |
			| url      |
			| desktop  |

	Scenario Outline: The user forgot put title in the image question type since <type> in progressive
		When the user adds all images possible to question since "<type>"
			And the user adds all title possible to images
			And the user clicks outside the section box
			And the user try pass to the share tab
		Then the notification should be displayed

		Examples:
			| type     |
			| url      |
			| desktop  |

	Scenario: The user forgot put images in the image question type in progressive
		When the user writes the title of the question
			And the user clicks outside the section box
			And the user try pass to the share tab
		Then the notification should be displayed

	Scenario Outline: The user creates a image question with paths since <type> in progressive
		When the user writes the title of the question
			And the user adds all images possible to question since "<type>"
			And the user adds all title possible to images
			And the user clicks on "add-paths" option
			And the user adds all paths possible in each image
			And the user clicks outside the section box
		Then the question is saved

		Examples:
			| type     |
			| url      |
			| desktop  |