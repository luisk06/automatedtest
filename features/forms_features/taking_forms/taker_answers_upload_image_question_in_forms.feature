@taking @complete @uploadImage @forms @formsTaking @uploadImageTaking @noRunOutLocal

Feature: Answering upload image question in forms

	As as user
	I want to answer a upload image question
	In order to express my answer with a upload image in the question

	Scenario: The user answers upload image question taking a photo in forms
		Given the user has an app
			And that the user has a "forms" with "upload_image" question left
		When the user take the qrvey
			And the user take a photo to upload
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page