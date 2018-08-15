'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the slider bar should be displayed$/, function(cb) {
		var _el = '.spec-time-slider-container';

		maker.finds(_el).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(cb);
	});
};