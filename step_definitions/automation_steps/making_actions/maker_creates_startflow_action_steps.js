'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects the schedule process (\d+) of the list$/, function( position, cb) {
		user.finds('.spec-open-select-flow').click();
		var _el = user.findsAll('.spec-qrvey-flow').get(position-1);
		_el.click().then(cb);
	});
};
