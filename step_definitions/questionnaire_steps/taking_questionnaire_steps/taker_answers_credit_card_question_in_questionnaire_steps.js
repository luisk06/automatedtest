'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes your credit card info$/, function(cb) {
		var creditcardNumber = '4242424242424242',
			dateExpires = rand.getExp(),
			cvcNumber = rand.getNumber({
				float: false,
				min: 100,
				max: 9999
			});

		maker.finds('.spec-trial-creditcard-number').sendKeys(creditcardNumber);
		maker.finds('.spec-trial-date-expires').sendKeys(dateExpires);
		maker.finds('.spec-trial-cvc-number').sendKeys(cvcNumber).then(cb);
	});

	When(/^the user clicks the Ok button for credit card$/, function(cb) {
		maker.finds('.spec-button-subscribe').click().then(cb);
	});
};