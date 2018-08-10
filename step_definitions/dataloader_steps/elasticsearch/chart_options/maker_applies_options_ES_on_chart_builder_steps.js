'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;


	When(/^the user enters "([^"]*)" as fixed "([^"]*)"$/, function (text, type, cb) {
		element(by.css('.spec-fixed-'+type+'-input')).clear().sendKeys(text).then(cb);	
	});

	When(/^the user clicks on "([^"]*)" in max series points$/, function (type, cb) {
		browser.actions().mouseMove(element(by.css('.spec-multiseries-ponint-'+type))).click().perform().then(function(){
			cb();
		});	
	});

	Then(/^a reference line should be displayed$/, function (cb) {
		element(by.css('.reference-line')).isPresent().then(function(_isDisplayed){
			expect(_isDisplayed).to.be.true;
		}).then(cb);	
	});

	When(/^the user inputs (\d+) on the max series input$/, function (number, cb) {
		element(by.css('.spec-multiseries-maxpoints-input input')).clear().sendKeys(number).then(cb);
	});

	
	Then(/^the reference line should contain "([^"]*)" as label text$/, function (text, cb) {
		element(by.css('.reference-line + text')).getText().then(function(_text){
			expect(_text).to.contain(text);
		}).then(cb);	
	});

	
};