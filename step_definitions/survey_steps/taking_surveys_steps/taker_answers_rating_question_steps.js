'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user reorganize the options$/, function(cb) {
		cb();
	});

	When(/^the user selects the amount of stars$/, function(cb) {
		user.takerTouchStarts().then(cb);
	});
};
