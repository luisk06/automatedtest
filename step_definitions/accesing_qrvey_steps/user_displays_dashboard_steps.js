'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has no qrveys$/, function(cb) {
		if (!isRemote) user.deteleAllQrveys().then(cb);
		else throw new Error('This server is not remote');
	});

	Then(/^a "([^"]*)" "([^"]*)" should be displayed$/, function(identifier, type, cb) {
		expect(navigate.isDisplayed('.spec_' + identifier + '_' + type), err.elementNotFound('.spec_' + identifier + '_' + type, type)).to.eventually.be.true.and.notify(cb);
	});

	When(/^"([^"]*)" "([^"]*)" is not displayed$/, function(identifier, type, cb) {
		var _element = '.spec_' + identifier + '_' + type;

		user.finds(_element).isPresent().then(function(_isPresent) {
			expect(_isPresent).to.be.false;
		}).then(cb);
	});

	Then(/^a "([^"]*)" "([^"]*)" should be displayed on the "([^"]*)"$/, function(identifier, type, location, cb) {
		expect(navigate.isDisplayed('.spec_' + location + '_' + identifier + '_' + type), err.elementNotFound('.spec_' + location + '_' + identifier + '_' + type, type)).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the list of qrveys should not be empty$/, function(cb) {
		expect(element.all(by.repeater('qrvey in qrveys')).count()).to.eventually.be.above(0).and.notify(cb);
	});
};
