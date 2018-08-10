@complete @making @yes-no @forms @formsMaking @subforms

Feature: The user creates a yes no question as subforms

	As an user
	I want to create a Yes/No choice question
	In order for users to answer

	@yesNoMakingSubforms
	Scenario Outline: The user creates a yes no question in subform like <option> with <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user created the "forms" with "yes_no" question in "draft"
			And the user opens the "webform" board
		When the user clicks on the subform option
			And the user clicks on the "<option>" option in the subform
			And the user clicks on publish tab
		Then the publish page should be displayed

		Examples:
			| planName | option 	|
			| standard | editable 	|
			| standard | read_ony 	|
			| basic    | editable 	|
			| basic    | read_ony 	|

	@yesNoMakingSubforms
	Scenario Outline: The user creates a yes no question in subform like <option> with <planName> plan
		Given the user has "<planName>" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user created the "forms" with "yes_no" question in "draft"
			And the user opens the "webform" board
		When the user clicks on the subform option
			And the user clicks on the "<option>" option in the subform
			And the user clicks on publish tab
		Then the publish page should not be displayed

		Examples:
			| planName | option 	|
			| standard | hidden 	|
			| basic    | hidden 	|