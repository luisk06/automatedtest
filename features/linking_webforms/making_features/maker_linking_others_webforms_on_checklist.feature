@todo @checklist @making @makingLinkingInChecklits @linking

Feature: The user link others webforms into a checklist

	As an user
	I want to link an webform into a checklist
	In order to show all them as one webform

	Scenario: The user open an application created
		Given the user has "standard" plan
			And the user has an app
			And the user into the app has "checklist" as "draft" with "checklist" question
			And the user into the app has "forms" as "active" with "yes_no" question
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user opened the first webform
		When the user clicks on add new link webform
			And the user clicks to selects the link webform type
			And the user selects "forms" link webform type
			And the user selects the first link webform