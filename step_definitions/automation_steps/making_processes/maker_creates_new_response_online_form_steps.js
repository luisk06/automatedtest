'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user opens placeholders$/, function(cb) {
		user.finds('.spec-view-placeholders').click().then(cb);
	});

	When(/^the user add a new placeholder$/, function(cb) {
		maker.addNewToken('numeric').then(function() {
			cb();
		});
	});

	Then(/^in the panel the new numeric placeholder is shown$/, function(cb) {
		expect(user.finds('.spec-automatiq-token-added').getText()).to.eventually.be.equal('{{numeric}}').and.notify(cb);
	});
};
