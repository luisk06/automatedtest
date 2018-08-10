'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the total of trend bars should be (\d+)$/, function(number, cb) {
		expect(element.all(by.css('.spec-trend-option')).count()).to.eventually.be.equal(parseInt(number)).and.notify(cb);
	});

	When(/^the user close the AN-modal$/, function(cb) {
		element(by.css('.AN-close-modal')).click().then(cb);
	});
};
