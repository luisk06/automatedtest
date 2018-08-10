'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^ the chart with filter should appear in the dashboard$/, function(){
		user.finds('.spec-download-drop').click();
		user.finds('.spec-add-to-dashboard').click();
	});
};
