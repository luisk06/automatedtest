@todo @making @deletes_qrveys @progressive

Feature: The user Deletes Qrveys

	As an user
	I want manages a qrvey


	Scenario: The user deletes qrvey
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user counted the amount of webform
		When the user clicks on the qrveys menu
			And clicks on "Delete"
			And clicks on "Yes" in the confirmation message
		Then the webform should be deleted

	Scenario: The user does not confirm the qrvey remove
		Given the user has "basic" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "progressive"
			And that the user counted the amount of webform
		When the user clicks on the qrveys menu
			And clicks on "Delete"
			And clicks on "No" in the confirmation message
		Then the webform should not be deleted