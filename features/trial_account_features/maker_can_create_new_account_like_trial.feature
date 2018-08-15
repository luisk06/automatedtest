@trialAccount @singUp @complete @smokeTest @sanityTest
@trialAccount @singUp @complete @smokeTest5

Feature: The user can to create a new account like trial

	As an user can to create a new account
	In order to test the app and all the features
	for a trial period of 15 days

	Scenario: The user create a new account like trial
		Given the user has not register before
			And the user stay in the register section
		When the user does sign up
			And the user access to profile settings
		Then the "15 days left in your trial" message should be diplayed
			And the user should have "Standard - monthly" as the default plan
			And the Change Plan button should be displayed