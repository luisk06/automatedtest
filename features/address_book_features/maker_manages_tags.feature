@complete @addressBook @addressBookTags

Feature: Managing tags

	As user can manages all tags
	in my address book
	that the current user has not contacts

	Background:
		Given the user has "standard" plan
			And the user has login

	@unitTags
	Scenario: The user add a new contact only with email in your address book
			And that the current user has at least 1 contact
		When the user go to "address_book"
			And the user clicks on the create new button
			And the user type the "email" of the new contact
			And the user type a new tag
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the username should be displayed

	@unitTags
	Scenario: The user add a new contact with all data in your address book
			And that the current user has at least 1 contact
		When the user go to "address_book"
			And the user clicks on the create new button
			And the user type the "name" of the new contact
			And the user type the "email" of the new contact
			And the user type the "phone" of the new contact
			And the user type a new tag
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the username should be displayed

	@unitTags
	Scenario: The user try to add a new contact without data in your address book
			And that the current user has at least 1 contact
		When the user go to "address_book"
			And the user clicks on the create new button
			And the user type a new tag
			And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then the modal still should be displayed

	@managesTags
	Scenario: The user adds a new tag in the tag manager
			And that the current user has at least 1 contact
			And that the current user has not tags
		When the user go to "address_book"
			And the user clicks on tags manager button
			And the user types the name of a new tag
			And the user clicks on add button
		Then the new tag should be displayed

	@managesTags
	Scenario: The user deletes a old tag in the tag manager
			And that the current user has at least 1 contact
			And that the current user has at least 1 tag
		When the user go to "address_book"
			And the user clicks on tags manager button
			And the user clicks on delete button
		Then the old tag should be not displayed