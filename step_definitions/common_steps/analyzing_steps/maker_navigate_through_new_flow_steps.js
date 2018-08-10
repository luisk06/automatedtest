'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user opens the just created app$/, function(cb) {
		var _class = '.spec_app_button_' + configer.get('AppID');
		// user.waitsFor(_class);

		element(by.css(_class)).click().then(cb);
	});

	Given(/^the user opens the "([^"]*)" board$/, function(site, cb) {
		element(by.css('.spec_' + site + '_dashboard')).click().then(cb);
	});
};