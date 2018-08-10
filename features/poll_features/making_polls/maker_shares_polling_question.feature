@todo @incompleted @polls @making @pollQrveysShares @shares

Feature: The user shares polling question

	As an user
	I should creates polling question
	In order to share

	Scenario Outline: The user sets results privacy settings to <typePrivacy> in a nps qrvey
		Given the user has an app called "Test User Audience Poll"
			And the user has login
			And the user opens the just created app
			And the user opens the "webform" board
			And that the user selects "polling" question type from the dropdown
		When the user clicks Create Quick "Polling" button
			And the user writes the "Share Poll Test" as "name" in "polling" type of qrvey
			And the user writes the "Desc" as "description" in "polling" type of qrvey
			And that the user has creates a "numeric" question
		When the user pass to the "polling" share tab
			And the user clicks on Privacy button
			And the user selects "<typePrivacy>" privacy from the dropdown
			And clicks on Activate button in "polling"
		Then the qrvey will be set to make results "<typePrivacy>"

		Examples:
			| typePrivacy   |
			| Public  		|
			| Private 		|