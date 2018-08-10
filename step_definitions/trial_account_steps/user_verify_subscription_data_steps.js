'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user click on the Done button$/, function(cb) {
		var el = '.spec-button-done';

		user.waitsFor(el);
		user.finds(el).click().then(cb);
	});

	When(/^the user go to your profile$/, function(cb) {
		user.navTo('/profile').then(cb);
	});

	Then(/^the subscription status should be basic$/, function(cb) {
		var el = '.spec_status_subscription';

		user.waitsFor(el);
		user.finds(el).getText().then(function(_text) {
			expect(_text).to.be.equal('Basic - monthly');
		}).then(cb);
	});

	Then(/^the renewal date should be 1 year more than today$/, function(cb) {
		var today = new Date(),
			dd = null,
			mm = null,
			yyyy = null;

		today.setDate(today.getDate() + 15);

		dd = today.getDate();
		mm = today.getMonth() + 1;
		yyyy = today.getFullYear();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		today = mm + '/' + dd + '/' + yyyy;

		element(by.css('.spec_renewal_date')).getText().then(function(_text) {
			expect(_text).to.be.equal(today);
		}).then(cb);
	});

	Then(/^the started date should be today$/, function(cb) {
		var today = new Date(),
			dd = today.getDate(),
			mm = today.getMonth() + 1,
			yyyy = today.getFullYear();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		today = mm + '/' + dd + '/' + yyyy;

		element(by.css('.spec_subscription_label')).getText().then(function(_text) {
			expect(_text).to.be.equal(today);
		}).then(cb);
	});

	Then(/^the credit card type should be "([^"]*)"$/, function(cctype, cb) {
		element(by.css('.spec-cctype')).getText().then(function(_text) {
			expect(_text).to.be.equal(cctype);
		}).then(cb);
	});

	Then(/^the last 4 digit of the credit card should be "([^"]*)"$/, function(lasytdigit, cb) {
		element(by.css('.spec-ccname')).getText().then(function(_text) {
			expect(_text).to.be.equal(lasytdigit);
		}).then(cb);
	});
};
