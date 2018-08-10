'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects the filename$/, function(cb) {
		var path = require('path'),
			absolutePath = path.resolve(__dirname, '../../support/contacts/ABS.xlsx'),
			remote = require('selenium-webdriver/remote');

		brw.driver.setFileDetector(new remote.FileDetector());

		user.finds('.spec-addressbook-contacts-upload').sendKeys(absolutePath).getAttribute('value').then(function(_text) {
			logger.log('_text', _text);
			expect(_text.slice(12, _text.length)).to.be.equal('ABS.xlsx');
		}).then(cb);
	});

	When(/^the user clicks on confirm button$/, function(cb) {
		user.finds('.spec-addressbook-contacts-upload-confirm').click().then(cb);
	});

	When(/^the user clicks on save x contacts$/, function(cb) {
		var _el = '.spec-addressbook-contacts-upload-save',
			e = element(by.css(_el));

		brw.wait(EC.presenceOf(e), 50000);
		user.finds(_el).click().then(cb);
	});

	Then(/^should have some contacts$/, function(cb) {
		element.all(by.repeater('contact in filteredContacts(letter)')).count().then(function(_count) {
			expect(_count).to.be.above(9);
		}).then(cb);
	});
};
