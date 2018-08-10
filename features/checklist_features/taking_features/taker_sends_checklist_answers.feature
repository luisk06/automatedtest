@todo @checklistTaking @checklistSendAnswers @checklist @taking

Feature: Send checklist answer on an email

	As an user
	I would like to send my answers to myself on an email
	In order to get a feedback of my answers

	Scenario: The user send his answers by email
		Given the user has an app called "Taker Checklist"
			And the user has a checklist qrvey
		When the user take the qrvey on "checklist"
			And the user check 1 option
			And the user enter "correct" email
			And the user clicks the submit button
			And the user clicks on email me the results
		Then a sent email message should appear