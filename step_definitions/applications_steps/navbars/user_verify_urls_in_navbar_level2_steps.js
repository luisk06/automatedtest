'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has click on his app$/, function(cb) {
		user.findsAll('.spec_app_button_' + appID).get(0).click().then(cb);
	});
};