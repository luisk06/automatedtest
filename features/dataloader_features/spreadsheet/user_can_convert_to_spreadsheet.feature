@dataloader @spreadsheet @todo @convertToForm

Feature: The user can convert one dataloader to form

	As an user
	I want to upload a dataloader
	In order to convert to form

	Background:
		Given the user has an app
			And the user has login
		When the user opened his app on "data-uploads"
			And the user clicks on the upload Data button
			And the user upload the csv file
			And the user clicks on the Save button in the Dataloader
			And the csv file should being to upload

	Scenario: The user activate a converted to form spreadsheet
			And the user opened his app on "data-uploads"
			And the user convert the just uploaded spreadsheet to form
		Then the form with name "Untitled Data Upload" must be added

	Scenario: The user take a dataloader converted to form and can ativate it
			And the user opened his app on "data-uploads"
			And the user convert the just uploaded spreadsheet to form
			And the user opened his app on "webforms"
			And the user opens the form with name "Untitled Data Upload"
			And clicks on Activate button in "forms-spreadsheet"
		Then the converted dataupload is succesfully activated