@todo @dataloader @aurora @dataloaderAurora

Feature: The user create to new dataloader as relational database

	As an user
	I want to new dataloader
	In order to add extra info

  	@smokeTest2
	Scenario: The user create a new dataloader as relational database
		Given the user has "standard" plan
			And the user has an app
			And the user has the deafult configure
			And the user has login
			And the user opened his app on "data-uploads"
		When the user clicks on the "relational-database" option in aurora
			And the user clicks on the upload Data button
			And the user writes the "host" on aurora
			And the user writes the "username" on aurora
			And the user writes the "password" on aurora
			And the user clicks on the Test button on aurora
			And the user selects the database origin
			And the user clicks on the Next button on aurora
			And the user selects a row on aurora
			And the user clicks on the Ok button on aurora
			And the user clicks on the Save button on aurora
			And the database should being to upload
		Then the user should be in the dataloader analyze