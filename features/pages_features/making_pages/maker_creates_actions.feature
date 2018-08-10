@todo @pages @creatingActionPages

Feature: The user creates actions to automate tasks

	As an user
	I want to create actions
	In order of automate tasks

	Scenario Outline: The user create a page with load application action
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
		When the user opened his app on "page-flows"
			And the user clicks the "Create Page" button
			And the user writes the page name
			And the user mark the access level as "public"
			And the user writes the page description
			And the user clicks the "Create" button
			And the user opens the actions panel
			And the user selects the type of action as load qrvey
			And the user selects the king of action as "<typeOfQrvey>"
			And the user selects the qrvey 1 of the list of "<typeOfQrvey>"
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey  |
			| survey       |
			| forms        |

	Scenario: The user create a page with email action
		Given the user has "standard" plan
			And the user has an app
			And the user has login
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put 3 contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the process is saved

	Scenario: The user create a page with SMS action
		Given the user has "standard" plan
			And the user has an app
			And the user has login
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "send-sms" action
			And the user put 2 contacts as addressee
			And the user put the message in sms
			And the user clicks on Activate
		Then the process is saved

	Scenario: The user create a page with start flow action
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
			And the user has a process "scheduling"
			And the user opened his app on "workflows"
			And the user opens the first "scheduling" process
			And the user opens the actions in startflow
			And the user selects the "send-sms" action
			And the user put 1 contacts as addressee
			And the user put the message in sms
			And the user clicks on Activate
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "start-flow" action
			And the user selects the schedule process 1 of the list in pages design
			And the user clicks on Activate
		Then the process is saved

	Scenario Outline: The user creates a page with webhook action in <typeOfQrvey>
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
			And the user has a process "scheduling"
			And the user opened his app on "workflows"
			And the user opens the first "scheduling" process
			And the user clicks on trigger select
			And the user select webhook option
			And the user clicks on copy button to save url
			And the user opens the actions
			And the user selects the "send-email" action
			And the user put 1 contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
			And the user opens the "webform" board
			And the user opens the create webform menu
			And the user created the "<typeOfQrvey>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "webhook" action
			And the user put the webhook url
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey |
			| survey      |
			| forms       |

	Scenario: The user create a page with show message action
		Given the user has "standard" plan
			And the user has an app
			And the user has login
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "showmsg" action
			And the user writes the message
			And the user clicks on Activate
		Then the process is saved

	Scenario Outline: The user create a page with find record action in a <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "find-record" action
			And the user selects the "<qrveySelected>" type in find record of "pages"
			And the user selects the qrvey in position 1 in find record
			And the user select the address question to compare
			And the user fills a new action inside "findrecord"
			And the user put 2 contacts as addressee
			And the user put the subject
			And the user put the message
			And the user clicks on Activate
		Then the page is saved

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form 			|

	Scenario Outline: The user create a page with load URL action in <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And the user created the "<typeOfQrvey>"
			And that the user selects "multiple choice" question type from the dropdown
			And the user writes the question and answers
			And the user clicks on publish tab
			And clicks on Activate button in "<typeOfQrvey>"
		When the user opened his app on "page-flows"
			And the user create a page
			And the user opens the actions
			And the user selects the "load-url" action
			And the user fills the url
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   |
			| forms         |
			| survey        |

	@findrecordpages
	Scenario Outline: The user want to create a page with an new response process with an add contact action using <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And that the user has a "<typeOfQrvey>" with registration questions
			And the user opened his app on "page-flows"
			And the user create a page
		When the user opens the actions
			And the user selects the "find-record" action
			And the user selects the "<qrveySelected>" type in find record of "pages"
			And the user selects the qrvey in position 1 in find record
			And the user select the email question to compare
			And the user clicks on add token
			And the user add the tokens for the add contact action
			And the user add an add contact action inside "findrecord"
			And the user fills the fields for add contact
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form 			|

	@todo
	Scenario Outline: The user want to add a new contact in a page with a <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And that the user has a "<typeOfQrvey>" with registration questions
			And the user opened his app on "page-flows"
			And the user create a page
		When the user opens the actions
			And the user selects the "examine-data" action
			And the user selects the "<qrveySelected>" type in find record of "pages"
			And the user selects the qrvey in position 1 in find record
			And the user select the email question to compare
			And the user clicks on add token
			And the user add the tokens for the add contact action
			And the user add an add contact action inside "findrecord"
			And the user fills the fields for add contact
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form 			|

	Scenario Outline: The user want to create a page with an new response process with an update contact action using <typeOfQrvey> in pages
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And that the user has a "<typeOfQrvey>" with registration questions for update contact
			And the user opened his app on "page-flows"
			And the user create a page
		When the user opens the actions
			And the user selects the "find-record" action
			And the user selects the "<qrveySelected>" type in find record of "pages"
			And the user selects the qrvey in position 1 in find record
			And the user select the email question to compare
			And the user clicks on add token
			And the user add the tokens for the update contact action
			And the user add an update contact action inside "findrecord"
			And the user fills the fields for update contact in pages
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form 			|

	Scenario Outline: The user want to update a contact in a page with a <typeOfQrvey> in pages
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And that the user has a "<typeOfQrvey>" with registration questions for update contact
			And the user opened his app on "page-flows"
			And the user create a page
		When the user opens the actions
			And the user selects the "examinedata" action
			And the user selects the "<typeOfQrvey>" type in examinedata of "pages"
			And the user selects the qrvey in position 1 in examine data
			And the user clicks on add condition
			And the user select the email question to compare
			And the user clicks on add token
			And the user add the tokens for the update contact action
			And the user add an update contact action inside "findrecord"
			And the user fills the fields for update contact
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form 			|

	Scenario Outline: The user want to create an app with an new response process with an delete contact action using <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And that the user has a "<typeOfQrvey>" with "email" question for delete contact
			And the user opened his app on "page-flows"
			And the user create a page
		When the user opens the actions
			And the user selects the "examinedata" action
			And the user selects the "<typeOfQrvey>" type in examinedata of "pages"
			And the user selects the qrvey in position 1 in examine data
			And the user clicks on add condition
			And the user select the email question to compare
			And the user clicks on add token
			And the user add the tokens for the delete contact action
			And the user add an delete contact action inside "findrecord"
			And the user fills the fields for delete contact
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form          |

	Scenario Outline: The user want to delete a contact with an app with an new response process using <typeOfQrvey>
		Given the user has "standard" plan
			And the user has an app
			And the user has login
			And that the user has a "<typeOfQrvey>" with registration questions for update contact
			And the user opened his app on "page-flows"
			And the user create a page
		When the user opens the actions
			And the user selects the "examinedata" action
			And the user selects the "<typeOfQrvey>" type in examinedata of "pages"
			And the user selects the qrvey in position 1 in examine data
			And the user clicks on add condition
			And the user select the email question to compare
			And the user clicks on add token
			And the user add the tokens for the delete contact action
			And the user add an delete contact action inside "findrecord"
			And the user fills the fields for delete contact
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form          |