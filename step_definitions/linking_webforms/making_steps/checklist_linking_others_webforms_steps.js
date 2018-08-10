'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on add new link webform$/, function (cb) {
		user.finds('.spec-design-add-state').click();
		element(by.linkText('Link webform')).click().then(cb);
	});

	When(/^the user clicks to selects the link webform type$/, function (cb) {
		user.finds('.spec-select-link-web-form-container').click();
		element(by.linkText('Link webform')).click().then(cb);
	});

	When(/^the user selects "([^"]*)" link webform type$/, function (type, cb) {
		user.finds('.dropdown .selected.arrow').click();
		// user.finds('.spec-link-webform-type-' + type).click().then(cb);
		user.findsAll('.dropdown .selected.arrow .options.show span').get(0).click().then(cb);
	});

	When(/^the user selects the first link webform$/, function (cb) {
		user.finds('.dropdown.select-with-filter .selected').click();
		user.findsAll('.dropdown.select-with-filter .selected .options.show span').get(0).click().then(cb);
	});

	When(/^the user opened the first webform$/, function (cb) {
		user.finds('.dropdown.select-with-filter .selected').click();
		user.findsAll('.dropdown.select-with-filter .selected .options.show span').get(0).click().then(cb);
	});
};