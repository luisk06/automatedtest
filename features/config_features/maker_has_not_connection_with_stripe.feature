@complete @config @configStripeConnect

Feature: The user adds text

	As an user
	I want to connect the stipe account in qrvey acount
	In order to get extra features

	Scenario: The user have not stripe account
		Given that the user is new
			And the user this has login
		When the user enter to config page
			And clicks on Stripe Connect button
			And the user fill all form
		Then the button should be activated with the text "Your Stripe Account is Connected"