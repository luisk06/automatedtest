'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var _title = 'Rating question creation test';

	When(/^the user writes the Rating question$/, function(cb) {
		navigate.sendKeys('.spec-edit-question-name-any', _title).then(cb);
	});
};
