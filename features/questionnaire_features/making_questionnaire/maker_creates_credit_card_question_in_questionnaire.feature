@todo @deprecated @making @creditCard @questionnaire @questionnaireMaking @qMakingCreditCard

Feature: The user creates a credit card question in questionnaire

	As an user
	I want to create a credit card question
	In order for users to answer

	Background:
		Given the user has an app
			And the user has login

	Scenario: The user creates a credit card question in questionnaire
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "questionnaire"
			And that the user selects "credit_card" question type from the dropdown
		When the user writes the title of question
			And the user writes the change amount
			And the user writes the charge description
			And the user clicks outside the section box
			And the user clicks on the publish tab
		Then the notify should not be displayed

	Scenario: The user forgot write amount
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "questionnaire"
			And that the user selects "credit_card" question type from the dropdown
		When the user writes the title of question
			And the user writes the charge description
			And the user clicks outside the section box
			And the user clicks on the publish tab
		Then the notify should be displayed

	Scenario: The user forgot write description
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "questionnaire"
			And that the user selects "credit_card" question type from the dropdown
		When the user writes the title of question
			And the user writes the change amount
			And the user clicks outside the section box
			And the user clicks on the publish tab
		Then the notify should be displayed