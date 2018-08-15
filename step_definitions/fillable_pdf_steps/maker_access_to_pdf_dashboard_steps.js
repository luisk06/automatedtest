'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user opened the manager files$/, function (cb) {
		maker.findsLinkText('Add / Manage Files').click().then(cb);
	});

	Then(/^the user should stay on the manager files url$/, function (cb) {
		expect(webpage.getCurrentUrl()).to.eventually.contain('fillable-templates').and.notify(cb);
	});

	Then(/^should not have pdf on the list$/, function (cb) {
		maker.finds('.empty-files span').getText().then(function(_text){
			expect(_text).to.be.equal('No files uploaded');
		}).then(cb);
	});
};
