'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selected the "([^"]*)" option in apps$/, function(option, cb) {
		cb();

		/*
			user.finds('element').click().then(cb);
		*/
	});

	Given(/^the user has the deafult configure$/, function(cb) {
		cb();
	});

	When(/^the user go to the integrations page$/, function(cb) {
		user.finds('.spec-dropdown-menu-main').click();
		user.finds('.spec_configuration_button').click().then(cb);
	});

	When(/^the user write the name and description app$/, function(cb) {
		var name = rand.getText();
		var description = rand.getText();

		// user.findsAll('.tab-container .tab').get(1).click();

		user.finds('.spec_new_app_head_settings').click();
		user.finds('.spec_new_app_name').sendKeys(name);
		user.finds('.spec_new_app_description').sendKeys(description).then(cb);
	});

	When(/^the user upload the logo app$/, function(cb) {
		cb();

		/*
			webpage.navTo('/configuration').then(cb);
		*/
	});

	When(/^the user selects the "([^"]*)" size font$/, function(sizeFont, cb) {
		user.finds('.spec_new_app_setup_size_font_' + sizeFont).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" type font$/, function(typeFont, cb) {
		user.finds('.spec_new_app_setup_type_font_' + typeFont).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" theme$/, function(typeTheme, cb) {
		user.finds('.spec_new_app_setup_type_theme_' + typeTheme).click().then(cb);
	});

	When(/^the user selects a random color theme$/, function(cb) {
		var randColor = rand.getColor();
		user.finds('.spec_new_app_setup_color').sendKeys(randColor).then(cb);
	});

	When(/^the configuration should be saved automatically$/, function(cb) {
		cb();
	});
};