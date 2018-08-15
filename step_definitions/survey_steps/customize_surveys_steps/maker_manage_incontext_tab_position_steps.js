'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user click on Show this description to respondents as intro page check$/, function(cb) {
		maker.finds('.checkbox.checkbox-success label').click().then(cb);
	});

	When(/^the user moves to "([^"]*)" view$/, function(tabOption, cb) {
		maker.finds('.spec-customize-' + tabOption + '-tab').click();
		webpage.waits(2000).then(function () {
			cb(); // Should be thus
		});
	});

	When(/^the screen is resized to "([^"]*)"$/, function(value, cb) {
		brw.executeScript('document.body.style.zoom=\'' + value + '\';').then(cb);
	});

	When(/^the user selects the "([^"]*)" position$/, function(viewOption, cb) {
		var el = element(by.css('.spec-tab-' + viewOption));
		brw.executeScript('arguments[0].scrollIntoView();', el.getWebElement()).then(function() {
			el.click();
			webpage.waits(2000);
		}).then(cb);
	});

	Then(/^the incontext should be displayed on "([^"]*)" position$/, function(viewOption, cb) {
		expect(webpage.isDisplayed('.spec-incontext-' + viewOption)).to.eventually.be.true.and.notify(cb);
	});
};
