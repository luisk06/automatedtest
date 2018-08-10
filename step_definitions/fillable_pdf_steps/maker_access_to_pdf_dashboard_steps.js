'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user opened the manager files$/, function (cb) {
		user.findsLinkText('Add / Manage Files').click().then(cb);
	});

	Then(/^the user should stay on the manager files url$/, function (cb) {
		expect(navigate.getCurrentUrl()).to.eventually.contain('fillable-templates').and.notify(cb);
	});

	Then(/^should not have pdf on the list$/, function (cb) {
		user.finds('.empty-files span').getText().then(function(_text){
			expect(_text).to.be.equal('No files uploaded');
		}).then(cb);
	});
};
