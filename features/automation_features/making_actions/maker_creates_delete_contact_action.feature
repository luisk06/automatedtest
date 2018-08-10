@complete @actions @processDeleteContact

Feature: The user creates a process with delete contact action

	As an user
	I want to add contacts
	In order to make contacts useful in workflows

	Scenario Outline: The user want to create an app with an new response process with an delete contact action using <typeOfQrvey>
		Given the user has an app
			And the user has login
			And that the user has a "<typeOfQrvey>" with "email" question for delete contact
			And the user has a process "new_response"
		When the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "<typeOfQrvey>"
			And the user selects the qrvey 1 of the list of "<typeOfQrvey>"
			And the user clicks on add token
			And the user add the tokens for the delete contact action
			And the user opens the actions
			And the user selects the "deletecontact" action
			And the user fills the fields for delete contact
			And the user clicks on Activate
		Then the process is saved

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form          |
			| survey        | survey        |

	Scenario Outline: The user want to delete a contact with an app with an new response process using <typeOfQrvey>
		Given the user has an app
			And that the current user has not contacts
			And the user has login
			And that the user has a "<typeOfQrvey>" with "email" question for delete contact
			And that the user has a contact in the addressbook
			And the user has a process "new_response"
			And the user opened his app on "workflows"
			And the user opens the first process in workflow
			And the user selects the king of new response as "<typeOfQrvey>"
			And the user selects the qrvey 1 of the list of "<typeOfQrvey>"
			And the user clicks on add token
			And the user add the tokens for the delete contact action
			And the user opens the actions
			And the user selects the "deletecontact" action
			And the user fills the fields for delete contact
			And the user clicks on Activate
		When the user take the "<typeOfQrvey>" for delete contact
			And the user has login
			And the user opens the addressbook
		Then the contact was successfully deleted

		Examples:
			| typeOfQrvey   | qrveySelected |
			| forms         | form          |
			| survey        | survey        |