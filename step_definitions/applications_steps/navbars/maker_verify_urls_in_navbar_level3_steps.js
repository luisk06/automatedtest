'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^description$/, function(cb) {
		cb();
	});

	When(/^description$/, function(cb) {
		cb();
	});

	Then(/^description$/, function(cb) {
		cb();
	});
};