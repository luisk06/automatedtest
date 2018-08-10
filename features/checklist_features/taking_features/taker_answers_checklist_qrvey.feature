@complete @checklistTaking @checklistAnswer @checklist @taking

Feature: Answering Checklist

	As an user
	I should answer a checklist
	In order to make user able to analyze answers

	Scenario: The user answer the checklist with no options checked
		Given the user has an app called "Taker Checklist"
			And the user has a checklist qrvey
		When the user take the qrvey on "checklist"
			And the user enter "correct" email
			And the user clicks the submit button
		Then the qrveys stays on same the question

	Scenario: The user answer the checklist with no email entered
		Given the user has an app called "Taker Checklist"
			And the user has a checklist qrvey
		When the user take the qrvey on "checklist"
			And the user check 1 option
			And the user clicks the submit button
		Then the qrveys stays on same the question

	Scenario: The user answer the checklist with wrong email format
		Given the user has an app called "Taker Checklist"
			And the user has a checklist qrvey
		When the user take the qrvey on "checklist"
			And the user check 1 option
			And the user enter "incorrect" email
			And the user clicks the submit button
		Then the qrveys stays on same the question

	@smokeTest1 @sanityTest
	Scenario: The user answers the checklist correctly
		Given the user has an app called "Taker Checklist"
			And the user has a checklist qrvey
		When the user take the qrvey on "checklist"
			And the user check 1 option
			And the user enter "correct" email
			And the user clicks the submit button
		Then the user should be on thankyou page