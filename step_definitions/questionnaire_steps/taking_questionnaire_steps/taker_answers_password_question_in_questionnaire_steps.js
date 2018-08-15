'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user type "([^"]*)" on "([^"]*)" input$/, function(password, input, cb) {
		taker.finds('.spec-taker-onlineform-' + input + '-input').sendKeys(password).then(cb);
	});
};
