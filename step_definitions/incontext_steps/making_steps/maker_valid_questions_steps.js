'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the alert should be displayed$/, function(cb) {
		maker.finds('.alert-template.alert-error').isDisplayed().then(function(_isDisplayed) {
			expect(_isDisplayed).to.be.true;
		}).then(cb);
	});

	Then(/^the alert should not be displayed$/, function(cb) {
		var el = element(by.css('.alert-template.alert-error')).isPresent();
		expect(el).to.eventually.be.false.and.notify(cb);
	});
};
