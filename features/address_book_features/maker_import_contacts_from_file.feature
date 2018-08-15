@complete @addressBook @imports

Feature: Importing contacts

	As user can import all contacts
	in my address book

	@newImports @smokeTest1
	Scenario: The user add a new contact only with email in your address book from the import
		Given the user has "standard" plan
			And the user has login
			And that the current user has not contacts
		When the user go to "address_book"
			And the user clicks on the "btn-import-contact" "new-contact" on "addressbook"
			And the user selects the filename
			And the user clicks on confirm button
			And the user clicks on save x contacts
		Then should have some contacts