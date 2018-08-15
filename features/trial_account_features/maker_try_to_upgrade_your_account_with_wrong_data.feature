@trialAccount @haveErrors @complete

Feature: The user try to upgrade your account with wrong data

	As an user can to upgrade your account
	In order to test the app and all the features
	without a trial period of 15 days

	Background:
		Given the user has not register before
			And the user stay in the register section
		When the user does sign up
			And the user access to profile settings
			And the user clicks on the Change Plan button
			And the user select the "basic" plan

	@todo
	Scenario: The user want to upgrade your account without information
			And the user click on the Subscribe button
		Then the "credit card number" field should have a error
			And the "date expires of credit card" field should have a error
			And the "cvc number" field should have a error

	Scenario: The user want to upgrade your account with only the credit card number
			And the user types your credit card number valid
			And the user click on the Subscribe button
		Then the "date expires of credit card" field should have a error
			And the "cvc number" field should have a error

	Scenario: The user want to upgrade your account with only the credit card number
			And the user types your credit card number valid
			And the user types the date expires of credit card
			And the user click on the Subscribe button
		Then the "cvc number" field should have a error