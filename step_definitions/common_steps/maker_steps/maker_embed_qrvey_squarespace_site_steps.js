'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user save the changes made in squarespace$/, function(cb) {
		element(by.css('.save .label')).click().then(cb);
	});

	When(/^the user write the widget code in the squarespace dashboard$/, function(cb) {
		skipSync(true);
		cb();
	});
};