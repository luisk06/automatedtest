@accessing @complete @forgotPassword

Feature: User forgot password

	As an User
	I want to get a new password
	In order to log in succesfully

	Scenario: User not registred
		Given the user never registred
		When the user hits the forgot password button
			And fills an email fields
			And the user clicks on send password button
		Then a "Email was not found." message should be displayed

	Scenario: User registred
		Given the user previously registred
		When the user hits the forgot password button
			And fills the email fields
			And the user clicks on send password button
		Then a "Email Sent" message should be displayed