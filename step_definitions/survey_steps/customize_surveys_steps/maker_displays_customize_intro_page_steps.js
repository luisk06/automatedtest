'use strict';

module.exports = function() {
	
	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the intro page elements should be displayed$/, function(cb) {
		element(by.css('.spec-custom-intro-page-tittle')).isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		});

		element(by.css('.spec-taker-qrvey')).isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});
};