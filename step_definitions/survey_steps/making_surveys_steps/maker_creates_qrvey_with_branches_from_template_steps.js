'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var pos = '';

	When(/^the user selects the (\d+) position template$/, function(template, cb) {
		pos = template-1;
		maker.finds('.spec-templates-selected-' + pos).then(cb).click();
	});

	When(/^the user clicks on Select Template for qrvey with branches$/, function(cb) {
		maker.finds('.spec-selected-template-' + pos).then(cb).click();
	});

	When(/^the user activate the qrvey$/, function(cb) {
		maker.finds('.spec-tab-to-share').click();
		maker.finds('.spec_template_lose_ok').click();
		maker.finds('.spec-tab-to-share').click();
		maker.finds('.spec-qrvey-btn-active').click().then(cb);
	});

	When(/^the user clicks on a "([^"]*)" template category$/, function( category, cb) {
		maker.selectTemplate(category).then(cb);
	});
};