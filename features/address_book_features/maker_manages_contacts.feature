@complete @addressBook @contacts

Feature: Managing contacts

	As user can manages all contacts
	in my address book

	Background:
		Given the user has "standard" plan
			And the user has login

	@newContact
	Scenario: The user add a new contact only with email in your address book
			And that the current user has not contacts
		When the user go to "address_book"
			And the user clicks on the "btn-create-contact" "new-contact" on "addressbook"
			And the user type the "email" of the new contact
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the email of the user in the name field should be displayed

	@newContact
	Scenario: The user add a new contact with all data in your address book
			And that the current user has not contacts
		When the user go to "address_book"
			And the user clicks on the "btn-create-contact" "new-contact" on "addressbook"
			And the user type the "name" of the new contact
			And the user type the "email" of the new contact
			And the user type the "phone" of the new contact
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the name of the user should be displayed

	@newContact
	Scenario: The user try to add a new contact without data in your address book
			And that the current user has not contacts
		When the user go to "address_book"
			And the user clicks on the "btn-create-contact" "new-contact" on "addressbook"
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the modal still should be displayed

	@unitContacts
	Scenario: The user add a new contact only with email in your address book
			And that the current user has at least 1 contact
		When the user go to "address_book"
			And the user clicks on the create new button
			And the user type the "email" of the new contact
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the name of the user should be displayed

	@unitContacts @smokeTest1 @sanityTest
	Scenario: The user add a new contact with all data in your address book
			And that the current user has at least 1 contact
		When the user go to "address_book"
			And the user clicks on the create new button
			And the user type the "name" of the new contact
			And the user type the "email" of the new contact
			And the user type the "phone" of the new contact
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the name of the user should be displayed

	@unitContacts
	Scenario: The user try to add a new contact without data in your address book
			And that the current user has at least 1 contact
		When the user go to "address_book"
			And the user clicks on the create new button
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the modal still should be displayed