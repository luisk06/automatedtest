'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the charge should be succeeds$/, function(cb) {
		user.waitsFor('.spec-cc-success').then(function() {
			return user.finds('.spec-cc-success').getText();
		}).then(function(_value) {
			expect(_value).to.be.equal('Transaction Succesfull');
		}).then(cb);
	});

	Then(/^the charge should be declined$/, function(cb) {
		user.waitsFor('.spec-cc-decline').then(function() {
			return user.finds('.spec-cc-decline').getText();
		}).then(function(_value) {
			expect(_value).to.be.equal('Credit Card Rejected');
		}).then(cb);
	});
};
