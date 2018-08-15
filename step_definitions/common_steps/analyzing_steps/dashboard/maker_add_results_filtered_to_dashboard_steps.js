'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^ the chart with filter should appear in the dashboard$/, function(){
		maker.finds('.spec-download-drop').click();
		maker.finds('.spec-add-to-dashboard').click();
	});
};
