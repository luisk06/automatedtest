'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^clicks on "([^"]*)" in the confirmation message$/, function(arg1, cb) {
		if (arg1 == 'Yes') maker.deleteMesssage('confirm').then(cb);
		else if (arg1 == 'No') maker.deleteMesssage('cancel').then(cb);
	});

	Then(/^the webform should be deleted$/, function(cb) {
		webpage.waits(1500);
		expect(maker.getsTotal('qrvey in allQrveys')).to.eventually.be.equal(0).and.notify(cb);
	});

	Then(/^the webform should not be deleted$/, function(cb) {
		expect(maker.getsTotal('qrvey in allQrveys')).to.eventually.be.equal(1).and.notify(cb);
	});
};
