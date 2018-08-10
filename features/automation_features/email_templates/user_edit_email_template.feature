@complete @automation @emailTemplate @editEmailTemplate

Feature: The user creates an email template and want to edit it

	As an user
	I want to create an template
	In order of customize the emails
	In workflows and pages send email actions

	Scenario: The user creates a new template and want to edit it
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opened his app on "config"
			And the user clicks on the settings tab
			And the user opens the email templates modal
			And the user clicks on create template
			And the user write the template name as "Template Name"
			And the user clicks the save button
		When the user clicks on edit template
			And the user write the template name as "Template Name Edited"
			And the user mark the template as default
			And the user clicks the save button
		Then the template was edited