'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user never registred$/, function(cb) {
		webpage.deleteAllCookies();
		brw.get(brw.baseUrl + '/').then(cb);
	});

	Given(/^the user previously registred$/, function(cb) {
		webpage.deleteAllCookies();
		brw.get(brw.baseUrl + '/').then(cb);
	});

	When(/^the user hits the forgot password button$/, function(cb) {
		element(by.id('spec-linkto-forgotpass')).click().then(cb);
	});

	When(/^fills an email fields$/, function(cb) {
		var email = rand.getEmail();
		element(by.css('.spec-user-forgot-password')).clear().sendKeys(email).then(cb);
	});

	When(/^fills the email fields$/, function(cb) {
		element(by.css('.spec-user-forgot-password')).clear().sendKeys(configer.get('username')).then(cb);
	});

	When(/^the user clicks on send password button$/, function(cb) {
		element(by.css('.spec-user-forgot-password-btn')).click().then(cb);
	});

	Then(/^a "([^"]*)" message should be displayed$/, function(arg1, cb) {
		expect(webpage.getsTextExists(arg1)).to.eventually.be.true.and.notify(cb);
	});
};
