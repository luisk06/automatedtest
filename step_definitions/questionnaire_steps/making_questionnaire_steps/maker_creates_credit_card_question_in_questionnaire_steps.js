'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes the change amount$/, function(cb) {
		var amount = rand.getNumber({
			float: false,
			min: 1,
			max: 99999999
		});

		element(by.css('.spec-multichoice-question-0-option-0')).sendKeys(amount).then(cb);
	});

	When(/^the user writes the charge description$/, function(cb) {
		var description = rand.getParagraph();
		element(by.css('.spec-edit-question-amount-description')).sendKeys(description).then(cb);
	});

	Then(/^the notify should be displayed$/, function(cb) {
		var isPresent = element(by.css('.alert-template.alert-error')).isDisplayed();
		expect(isPresent).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the notify should not be displayed$/, function(cb) {
		var isPresent = element(by.css('.alert-template.alert-error')).isPresent();
		expect(isPresent).to.eventually.be.false.and.notify(cb);
	});
};