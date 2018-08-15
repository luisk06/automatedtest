@pages @usingPages @updateWebform @todo

Feature: The user creates actions to test the updation of webforms in pages

	As an user
	I want to create an update webform action
	in order of update webforms in pages


	Scenario: The user create a page with find record action in a forms
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "forms"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "forms"
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "find-record" action
			And the user selects the "form" type in find record of "pages"
			And the user selects the qrvey in position 1 in find record
			And the user select the address question to compare
			And the user fills a new sms action inside "findrecord" with record not found
			And the user put 1 contacts in sms
			And the user put the message in sms
			And the user clicks on Activate
			And the user activate the main page
			And the user open the project url
			And the user answers the "multiple choice" question
		# Then the other webform was updated