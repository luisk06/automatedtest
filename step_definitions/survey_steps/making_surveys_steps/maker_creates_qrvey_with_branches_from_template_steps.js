'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var pos = '';

	When(/^the user selects the (\d+) position template$/, function(template, cb) {
		pos = template-1;
		navigate.clicksButton('.spec-templates-selected-' + pos).then(cb);
	});

	When(/^the user clicks on Select Template for qrvey with branches$/, function(cb) {
		navigate.clicksButton('.spec-selected-template-' + pos).then(cb);
	});

	When(/^the user activate the qrvey$/, function(cb) {
		navigate.clicksButton('.spec-tab-to-share');
		navigate.clicksButton('.spec_template_lose_ok');
		navigate.clicksButton('.spec-tab-to-share');
		navigate.clicksButton('.spec-qrvey-btn-active').then(cb);
	});

	When(/^the user clicks on a "([^"]*)" template category$/, function( category, cb) {
		maker.selectTemplate(category).then(cb);
	});
};