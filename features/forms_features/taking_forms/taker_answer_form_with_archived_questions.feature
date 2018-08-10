@archive @complete @making @forms @formsMaking @formsArchiveMaking @archiveMaking

Feature: Answering a form with an archived question

	As an user
	I want to take a form
	In order to test that archived questions
	Are not shown

	Scenario: The user answers a form with an archived question
		Given the user has an app
			And the user has login
			And that the user has a "forms" with 3 questions as draft
			And the user open the just created webform
		When the user clicks on publish tab
			And clicks on Activate button in "forms"
			And the user clicks on Pause button
			And the user clicks on design button
			And the user archive a question
			And the user clicks on publish tab
			And the user reactivate the qrvey
			And the user opens the webform user
			And the user take the qrvey
			And the user selects the desired answer choice
			And the user selects answers in "short_text" question
			And the user clicks the Ok button
		Then the user should jump to the finished qrvey page