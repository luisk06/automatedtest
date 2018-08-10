'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user write the email$/, function(cb) {
		var email = rand.getEmail();
		var el = 'input[type="email"].textfield-area.requested-email';

		user.waitsFor(el);

		element(by.css(el)).sendKeys(email).then(cb);
	});
};