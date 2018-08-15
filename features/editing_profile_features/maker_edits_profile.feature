@complete @editing

Feature: User edits profile

	As an user
	I want to edit my profile
	In order to keep my information up to date

	Scenario: The user changes your profile information except the password
		Given the user has login
			And the user access to profile settings
		When the user updates they "first_name" "field" to "Modified first name" and a random number
			And the user updates they "last_name" "field" to "Modified last name" and a random number
			And the user updates they "organization" "field" to "Modified organization name" and a random number
			And the user updates they "address" "field" to "Modified address" and a random number
		Then the user "first_name" should be updated
			And the user "last_name" should be updated
			And the user "organization" should be updated
			And the user "address" should be updated

	@smokeTest2
	Scenario: The user changes your password
		Given the user has login
			And the user access to profile settings
		When the user clicks on the "change_password" "button"
			And inputs they old password
			And inputs they new password
			And confirms they new password
			And clicks on save
		Then the new password should be changed
			And the user should be able to login with it's new password

	Scenario: The user try to change your email
		Given the user has login
			And the user access to profile settings
		When the user change you email by a new random email
			And the user clicks off field
		Then the message for change the email should be displayed