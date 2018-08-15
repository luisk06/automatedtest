'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has not apps$/, function(cb) {
		cb(); // No should to do nothing
	});

	Then(/^the main dashboard should be displayed$/, function(cb) {
		expect(
			webpage.isDisplayed('.spec-create-new-app-btn')
		).to.eventually.be.true;
		expect(
			webpage.isDisplayed('.spec-qrvey-logo-exp')
		).to.eventually.be.true;
		expect(
			webpage.isDisplayed('.guide-tour')
		).to.eventually.be.true;
		expect(
			webpage.isDisplayed('.user-account-top .name')
		).to.eventually.be.true;
		expect(
			webpage.isDisplayed('.tab-container .tab:not(.active)')
		).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the main application box should be displayed$/, function(cb) {
		expect(
			webpage.isDisplayed('.module.create-app')
		).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the application search field should be displayed$/, function(cb) {
		expect(
			webpage.isDisplayed('.spec_search_input')
		).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the applications created should be displayed$/, function(cb) {
		expect(
			webpage.isDisplayed('.module:not(.create-app)')
		).to.eventually.be.true;

		expect(
			maker.count('.module:not(.create-app)')
		).to.eventually.be.above(0).and.notify(cb);
	});

	Then(/^a "([^"]*)" "([^"]*)" should be displayed$/, function(identifier, type, cb) {
		expect(
			webpage.isDisplayed('.spec_' + identifier + '_' + type)
		).to.eventually.be.true.and.notify(cb);
	});

	When(/^"([^"]*)" "([^"]*)" is not displayed$/, function(identifier, type, cb) {
		var _element = '.spec_' + identifier + '_' + type;

		maker.finds(_element).isPresent().then(function(_isPresent) {
			expect(_isPresent).to.be.false;
		}).then(cb);
	});

	Then(/^a "([^"]*)" "([^"]*)" should be displayed on the "([^"]*)"$/, function(identifier, type, location, cb) {
		expect(
			webpage.isDisplayed('.spec_' + location + '_' + identifier + '_' + type)
		).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the list of qrveys should not be empty$/, function(cb) {
		expect(element.all(by.repeater('qrvey in qrveys')).count()).to.eventually.be.above(0).and.notify(cb);
	});
};
