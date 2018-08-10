'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var selectInput = function(type){
		return (type == 'minimum') ? '.spec-password-minimum-input' : '.spec-password-maximum-input';
	};

	When(/^the user set (\d+) as "([^"]*)" value$/, function(value, type, cb) {
		var _input = selectInput(type);

		element(by.css(_input)).clear().sendKeys(value).then(cb);
	});

	When(/^the user check confirm password$/, function(cb) {
		element(by.css('.spec-password-confirm-check + label')).click().then(cb);
	});

	When(/^the user clicks on "([^"]*)" input$/, function(type, cb) {
		var _input = selectInput(type);
		element(by.css(_input)).click().then(cb);
	});

	Then(/^the "([^"]*)" input should contain (\d+)$/, function(type, number, cb) {
		var _input = selectInput(type);

		element(by.css(_input)).getAttribute('value').then(function(_val){
			expect(_val).to.be.equal(number);
		}).then(cb);
	});
};