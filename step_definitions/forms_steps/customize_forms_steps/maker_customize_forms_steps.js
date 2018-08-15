'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on "([^"]*)" view tab$/, function (view, cb) {
		webpage.waits(1300);
		element(by.css('.spec-customize-tab-' + view)).click().then(cb);
	});

	When(/^the user closes the edit style alert$/, function (cb) {
		element(by.css('.close-alert')).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" column layout$/, function (column, cb) {
		element(by.css('.spec-customize-column-' + column)).click().then(cb);
	});

	When(/^the user selects "([^"]*)" label$/, function (label, cb) {
		element(by.css('.spec-customize-label-' + label)).click().then(cb);
	});

	Then(/^the online view should be displayed with "([^"]*)" column$/, function (column, cb) {
		brw.ignoreSynchronization = true;
		webpage.waits(1500);
		brw.switchTo().frame(element(by.id('preview-frame')).getWebElement()).then(function () {
			expect(hasClass(element(by.css('.spec-preview-container')), 'spec-' + column + '-columns')).to.eventually.be.true;
		}).then(function () {
			brw.driver.switchTo().defaultContent();
			brw.ignoreSynchronization = false;
		}).then(cb);
	});

	Then(/^the online view should be displayed with "([^"]*)" label$/, function (label, cb) {
		brw.ignoreSynchronization = true;
		webpage.waits(1500);
		brw.switchTo().frame(element(by.id('preview-frame')).getWebElement()).then(function () {
			expect(hasClass(element(by.css('.spec-preview-container')), 'spec-label-' + label)).to.eventually.be.true;
		}).then(function () {
			brw.driver.switchTo().defaultContent();
			brw.ignoreSynchronization = false;
		}).then(cb);
	});

	Then(/^the customize online view option for "([^"]*)" should be disabled$/, function (option, cb) {
		element(by.css('.spec-customize-' + option)).click().then(
			function () {
				fail('Element should not be clickable for Observer');
			},
			function (err) {
				expect(err.message.toString()).to.be.contain('is not clickable at point');

			}).then(cb);
	});
};
