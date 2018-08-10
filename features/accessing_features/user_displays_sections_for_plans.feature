@complete @plans @firstUse

Feature: Avialable application types depending on user's plan

	As an user
	I should be enabled to create aplications
	In order to tests the new flow based on plans

	Scenario: The user has the basic plan
		Given the user has login
			And the user has the "basic" plan
		When the user stays in the Create Aplications Form
		Then the user must has enabled the create aplications button
			And the user must has enabled to selects the "webform" option
			And the user must have disabled to selects the "upload" option
			And the user must have disabled to selects the "liveconnection" option

	Scenario: The user has the standard plan
		Given the user has login
			And the user has the "standard" plan
		When the user stays in the Create Aplications Form
		Then the user must has enabled the create aplications button
			And the user must has enabled to selects the "webform" option
			And the user must have enabled to selects the "upload" option
			And the user must have disabled to selects the "liveconnection" option