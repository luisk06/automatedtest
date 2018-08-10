@complete @archive @forms @making @formsMaking

Feature: The user creates 3 or more questions and want to archive in forms

	As an user
	I want to create a form
	In order to test archived questions

	Scenario: The user creates a form and want to archive a question
		Given the user has an app
			And the user has login
			And that the user has a "forms" with 3 questions as draft
			And the user open the just created webform
		When the user clicks on publish tab
			And clicks on Activate button in "forms"
			And the user clicks on Pause button
			And the user clicks on design button
			And the user archive a question
		Then the question is archived

	Scenario: The user want to unarchive questions
		Given the user has an app
			And the user has login
			And that the user has a "forms" with 3 questions as draft
			And the user open the just created webform
		When the user clicks on publish tab
			And clicks on Activate button in "forms"
			And the user clicks on Pause button
			And the user clicks on design button
			And the user archive a question
			And the user unarchive the question
		Then the question was unarchived

	Scenario: The user try to archive a form with one question
		Given the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
		When the user clicks on publish tab
			And clicks on Activate button in "forms"
			And the user clicks on Pause button
			And the user clicks on design button
			And the user try to archive a question
		Then the question is not archived