@complete @automation @emailTemplate @newEmailTemplate

Feature: The user creates email templates

	As an user
	I want to create an template
	In order of customize the emails
	In workflows and pages send email action

	Background:
		Given the user has an app
			And the user has login

	Scenario: The user creates a new template
			And the user opens the just created app
			And the user opened his app on "config"
			And the user clicks on the settings tab
		When the user opens the email templates modal
			And the user clicks on create template
			And the user write the template name as "Template Name"
			And the user clicks the save button
		Then the template was created

	Scenario: The user mark a template as default
			And the user opens the just created app
			And the user opened his app on "config"
			And the user clicks on the settings tab
		When the user opens the email templates modal
			And the user clicks on create template
			And the user write the template name as "Template Name"
			And the user mark the template as default
			And the user clicks the save button
		Then the template is the default template