'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var userName = null,
		userEmail = null,
		emailDomain = {
			domain: 'addressbook.com'
		};

	When(/^the user go to "([^"]*)"$/, function(section, cb) {
		if(section === 'address_book'){
			user.finds('.spec-dropdown-menu-main').click();
			user.finds('.spec_address_book_button').click().then(cb);
		}
	});

	Given(/^that the current user has not contacts$/, function(cb) {
		cs.deleteAllContacts().then(function() {
			logger.log('deleted all contacts');
		}).then(cb);
	});

	Given(/^that the current user has at least 1 contact$/, function(cb) {
		var _newContact = {
			name: rand.getFullName(),
			email: rand.getEmail(emailDomain),
			phone: rand.getPhone(),
			tags: [{ text: rand.getWord({ formatted: false }) }]
		};

		cs.create(_newContact).then(function() {
			logger.log('create 1 contact');
		}).then(cb);
	});

	When(/^the user type the "([^"]*)" of the new contact$/, function(type, cb) {
		var field = null;

		if (type == 'name') {
			field = rand.getFullName();
			userName = field;
		} else if (type == 'email') {
			field = userName = userEmail = rand.getEmail(emailDomain);
		} else if (type == 'phone') {
			field = rand.getPhone();
		}

		element(by.css('.spec-addressbook-new-contact-' + type)).sendKeys(field).then(cb);
	});

	When(/^the user clicks on the "([^"]*)" "([^"]*)" on "([^"]*)"$/, function(arg1, arg2, arg3, cb) {
		arg2 = (arg2 == 'button') ? 'btn' : arg2;
		element(by.css('.spec-' + arg3 + '-' + arg2 + '-' + arg1)).click().then(cb);
	});

	When(/^the user clicks on the create new button$/, function(cb) {
		element(by.css('.spec-addressbook-add-contact-btn')).click();
		element(by.css('.spec-addressbook-create-new-contact-btn')).click().then(cb);
	});

	Then(/^the email of the user in the name field should be displayed$/, function(cb) {
		element(by.css('.spec-addressbook-name')).getText().then(function(_value) {
			expect(_value).to.be.equal(userEmail);
		}).then(cb);
	});

	Then(/^the name of the user should be displayed$/, function(cb) {
		var _el = '.spec-addressbook-name',
			_el2 = element.all(by.css(_el));

		user.waitsFor(_el).then(function() {
			logger.log('userName', userName);

			_el2.count().then(function(num) {
				async.times(num, function(n, next) {
					_el2.get(n - 1).getText().then(function(text) {
						logger.log('text', text);
						logger.log('userName', userName);

						if (text === userName) {
							expect(userName).to.be.equal(text);
							cb();
						} else next();
					});
				}, function(err) {
					cb(err);
				});
			});
		});
	});

	Then(/^the modal still should be displayed$/, function(cb) {
		element(by.css('.modal')).isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});
};
