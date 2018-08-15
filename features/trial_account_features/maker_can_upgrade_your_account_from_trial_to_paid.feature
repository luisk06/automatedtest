@trialAccount @downgrade @complete

Feature: The user can to downgrade your account from trial to paid

	As an user can to downgrade your account
	In order to test the app and all the features
	without a trial period of 15 days

	Background:
		Given the user has not register before
			And the user stay in the register section
		When the user does sign up
			And the user access to profile settings
			And the user clicks on the Change Plan button
			And the user select the "basic" plan

	@smokeTest5 @firtHand
	Scenario: The user want to downgrade your account with a credit card valid
			And the user types your credit card number valid
			And the user types the date expires of credit card
			And the user types your cvc number
			And the user click on the Subscribe button
		Then the charge should be succeeds

	Scenario Outline: The user want to downgrade your account with a credit card number <number> of <name> valid
			And the user types your credit card number <number> of "<type>"
			And the user types the date expires of credit card
			And the user types your cvc number
			And the user click on the Subscribe button
		Then the charge should be succeeds

		Examples:
			| name 			| type 			| number 	       |
			| Visa 			| Visa 			| 4242424242424242 |
			| Visa 			| Visa 			| 4012888888881881 |
			| Visa 			| Visa 			| 4000056655665556 |
			| Visa 			| Visa 			| 4000000760000002 |
			| Visa 			| Visa 			| 4000001240000000 |
			| Visa 			| Visa 			| 4000004840000008 |
			| Mastercard 	| Mastercard 	| 5555555555554444 |
			| Mastercard 	| Mastercard 	| 5200828282828210 |
			| American 		| American 		| 378282246310005  |
			| American 		| American		| 371449635398431  |
			| Discover 		| Discover 		| 6011111111111117 |
			| Discover 		| Discover 		| 6011000990139424 |
			| Diners 		| Diners 		| 30569309025904   |
			| Diners 		| Diners 		| 38520000023237   |
			| JCB 			| JCB 			| 3530111333300000 |
			| JCB 			| JCB 			| 3566002020360505 |

	Scenario Outline: The user has not issues in your credit card number <number> and should be succeeds
			And the user types your credit card number <number> of "random"
			And the user types the date expires of credit card
			And the user types your cvc number
			And the user click on the Subscribe button
		Then the charge should be <status>

		Examples:
			| number 	       | status   |
			| 4000000000000093 | succeeds |
			| 4000000000000010 | succeeds |
			| 4000000000000036 | succeeds |
			| 4000000000000044 | succeeds |
			| 4000000000009235 | succeeds |
			| 4100000000000019 | succeeds |

	Scenario Outline: The user has issues in your credit card number <number> and should be declined
			And the user types your credit card number <number> of "random"
			And the user types the date expires of credit card
			And the user types your cvc number
			And the user click on the Subscribe button
		Then the charge should be <status>

		Examples:
			| number 	       | status   |
			| 4000000000000101 | declined |
			| 4000000000000002 | declined |
			| 4000000000000127 | declined |
			| 4000000000000069 | declined |
			| 4000000000000119 | declined |
			| 3546454534534536 | declined |
			| 36667654324569   | declined |
			| 345321123123337  | declined |
			| 6453234234234221 | declined |
			| 2349912323233223 | declined |
			| 4354565765754441 | declined |
			| 4353453345453456 | declined |