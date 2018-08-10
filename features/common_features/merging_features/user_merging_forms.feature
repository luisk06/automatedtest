@complete @qrvey @validations @merging @qrveyMaker

Feature: The user merge two webforms or dataset

	As an user
	I should can merge webforms or dataset
	In order to create new data from old data

	@mergingSimple
	Scenario: The user merge two forms
		Given the user has "standard" plan
			And the user has an app
			And that the user has a "forms" with "yes_no" question
			And that the user has a "forms" with "name" question
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the merge option
			And the user selects the origin type
			And the user selects the next forms
			And the user write the new name to the merged forms
			And the user clicks on the next button to merge
			And the user clicks on merge button
			And the user clicks on continue button
		Then the 3 webforms are displayed on the dashboard

	Scenario: The user merge two forms to be activated
		Given the user has "standard" plan
			And the user has an app
			And that the user has a "forms" with "yes_no" question
			And that the user has a "forms" with "name" question
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
		When the user clicks on the merge option
			And the user selects the origin type
			And the user selects the next forms
			And the user write the new name to the merged forms
			And the user clicks on the next button to merge
			And the user clicks on merge button
			And the user clicks on continue button
			And the user opens the webform merged
		Then the publish page is show correctly
			And the webform should be reactivated correctly