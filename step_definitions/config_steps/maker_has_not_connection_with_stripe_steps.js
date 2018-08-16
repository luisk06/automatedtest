'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var newAccount = null,
		newPass = '123456';

	Given(/^that the user is new$/, function(cb) {
		cb();
	});

	Given(/^the user this has login$/, function(cb) {
		maker.toDoLogin().then(function(){
			cb();
		});
	});

	When(/^the user enter to config page$/, function(cb) {
		webpage.navTo('/configuration').then(cb);
	});

	When(/^clicks on Stripe Connect button$/, function(cb) {
		maker.finds('.stripe-button').click().then(cb);
	});

	When(/^the user fill all form$/, function(cb) {
		skipSync(true);
		element(by.css('#skip-account-app')).click();
		skipSync(false);

		cb();
	});

	Then(/^the button should be activated with the text "([^"]*)"$/, function(text, cb) {
		var el = '.stripe_connected';

		webpage.waitsFor(el).then(function() {
			expect(element(by.css(el)).getText()).to.eventually.be.equal(text).and.notify(cb);
		});
	});
};
