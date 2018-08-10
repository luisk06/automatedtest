'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user save the current url of process$/, function(cb) {
		var currentUrl = '';

		user.waits(4000).then(function() {
			brw.getCurrentUrl().then(function(_res){
				currentUrl = _res;
				logger.log(currentUrl);
			}).then(cb);
		});
	});

	When(/^the user returns to webhook process$/, function(cb) {
		var currentUrl = '';

		user.waits(1000).then(function() {
			brw.get(currentUrl).then(cb);
		});
	});
};
