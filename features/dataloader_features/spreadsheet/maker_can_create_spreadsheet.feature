@complete @dataloader @spreadsheet @dataloaderSpreadsheet

Feature: The user create to new dataloader as spreadsheet

	As an user
	I want to new dataloader
	In order to add extra info

  	@smokeTest2
	Scenario: The user create a new dataloader as spreadsheet
		Given the user has "standard" plan
			And the user has an app
			And the user has the deafult configure
			And the user has login
			And the user opened his app on "data-uploads"
		When the user clicks on the upload Data button
			And the user upload the csv file
			And the user clicks on the Save button in the Dataloader
		Then the csv file should being to upload