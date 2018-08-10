'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user type (\d+) on "([^"]*)" input$/, function(value, input, cb) {
		element(by.css('.spec-'+input+'-input')).sendKeys(value).then(cb);
	});

	When(/^the user writes down "([^"]*)" on "([^"]*)" input$/, function(value, input, cb) {
		element(by.css('.spec-'+input+'-input')).sendKeys(value).then(cb);
	});

	When(/^the user clicks on add filter button$/, function(cb) {
		element(by.css('.spec-add-filter-button')).click().then(cb);
	});

	
};
