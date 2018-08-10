'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the map canvas should be displayed$/, function (cb) {
		element(by.css('.spec-map-container canvas')).isDisplayed().then(function(_isDisplayed){
			expect(_isDisplayed).to.be.true;
		}).then(cb);
	});
	

	
};