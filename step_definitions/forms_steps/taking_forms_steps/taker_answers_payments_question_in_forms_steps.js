'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user valid the credit card info$/, function(cb) {
		var el = '.spec-cc-success';

		user.finds('.spec-button-subscribe').click();
		webpage.waitsFor(el);

		user.finds(el).getText().then(function(_text){
			expect(_text).to.be.equal('Your credit card is valid.');
		}).then(cb);
	});
};