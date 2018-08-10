'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^clicks on "([^"]*)" in the confirmation message$/, function(arg1, cb) {
		if (arg1 == 'Yes') user.deleteMesssage('confirm').then(cb);
		else if (arg1 == 'No') user.deleteMesssage('cancel').then(cb);
	});

	Then(/^the webform should be deleted$/, function(cb) {
		user.waits(1500);
		expect(user.getsTotal('qrvey in allQrveys')).to.eventually.be.equal(0).and.notify(cb);
	});

	Then(/^the webform should not be deleted$/, function(cb) {
		expect(user.getsTotal('qrvey in allQrveys')).to.eventually.be.equal(1).and.notify(cb);
	});
};
