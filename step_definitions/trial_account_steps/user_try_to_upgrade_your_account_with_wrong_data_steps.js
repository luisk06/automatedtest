'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the "([^"]*)" field should have a error$/, function(field, cb) {
		var _text = null;
		var _class = user.finds('.spec-cc-decline');

		switch (field){
			case 'credit card number':
				_text = 'Your card number is incomplete.';
				break;
			case 'date expires of credit card':
				_text = 'Your card expiration date is incomplete.';
				break;
			case 'cvc number':
				_text = 'Your card security code is incomplete.';
				break;
		}

		webpage.waitsFor(_class);

		user.finds(_class).getText().then(function(text){
			expect(text).to.be.equal(_text);
		}).then(cb);
	});
};