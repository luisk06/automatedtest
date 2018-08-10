@trialAccount @subscriptionData @complete

Feature: The user verify the subscription data in the profile

	As an user want to verify the subscription data in the profile
	In order to test if the data is saved and correct

	Scenario: The user verify the subscription data in the profile
		Given the user has not register before
			And the user stay in the register section
		When the user does sign up
			And the user access to profile settings
			And the user clicks on the Change Plan button
			And the user select the "basic" plan
			And the user types your credit card number valid
			And the user types the date expires of credit card
			And the user types your cvc number
			And the user click on the Subscribe button
			And the user click on the Done button
			And the user go to your profile
		Then the subscription status should be basic
			And the renewal date should be 1 year more than today
			And the started date should be today
			And the credit card type should be "Visa"
			And the last 4 digit of the credit card should be "0077"