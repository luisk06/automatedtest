@todo @addressBook @premiumFeatures

Feature: The user can use the premium feature

	As user can create all contacts
	in my address book

	@smokeTest
	Scenario: The user add a new contact
		Given the user has "basic" plan
			And the user has login
			And that the current user has 5000 contacts
		When the user go to "address_book"
			And the user clicks on the "btn-create-contact" "new-contact" on "addressbook"
		 	And the user type the "name" of the new contact
		 	And the user type the "email" of the new contact
		 	And the user type the "phone" of the new contact
		 	And the user clicks on the "btn-create" "new-contact" on "addressbook"
		Then should have some contacts