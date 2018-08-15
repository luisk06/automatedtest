'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user opens the just created app$/, function(cb) {
		maker.findsAll('.my-apps .module:not(.create-app)').get(0).click().then(cb);
	});

	Given(/^the user opens the "([^"]*)" board$/, function(site, cb) {
		maker.finds('.left-nav:not(.left-nav-ipad) .spec_' + site + '_dashboard').click().then(cb);
	});
};