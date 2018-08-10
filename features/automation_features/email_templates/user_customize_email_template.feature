@complete @automation @emailTemplate @customizeEmailTemplates

Feature: The user creates an email template and customize it

	As an user
	I want to create an template
	In order of customize the emails
	In workflows and pages send email actions

	Scenario: The user create and write messages inside a template
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opened his app on "config"
			And the user clicks on the settings tab
		When the user opens the email templates modal
			And the user clicks on create template
			And the user write the template name as "Template Name"
			And the user write a text in the header for the template
			And the user write a text in the body for the template
			And the user write a text in the footer for the template
			And the user clicks the save button
		Then the template was created

	@todo
	Scenario: The user create a template and change the background color
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opened his app on "config"
			And the user clicks on the settings tab
		When the user opens the email templates modal
			And the user clicks on create template
			And the user write the template name as "Template Name"
			And the user change the background color in the header for the template
			And the user change the background color in the body for the template
			And the user change the background color in the footer for the template
			And the user clicks the save button
		Then the template was created

	Scenario Outline: The user add images to the template
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opened his app on "config"
			And the user clicks on the settings tab
		When the user opens the email templates modal
			And the user clicks on create template
			And the user clicks on the "<templateElement>" element
			And the user upload an image in the element
		Then the image was inserted in the "<templateElement>" element

		Examples:
			| templateElement |
			| header          |
			| body            |
			| footer          |