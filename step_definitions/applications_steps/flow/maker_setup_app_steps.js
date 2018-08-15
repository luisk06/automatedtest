'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selected the "([^"]*)" option in apps$/, function(option, cb) {
		cb();

		/*
			maker.finds('element').click().then(cb);
		*/
	});

	Given(/^the user has the deafult configure$/, function(cb) {
		cb();
	});

	When(/^the user go to the integrations page$/, function(cb) {
		maker.finds('.spec-dropdown-menu-main').click();
		maker.finds('.spec_configuration_button').click().then(cb);
	});

	When(/^the user write the name and description app$/, function(cb) {
		var name = rand.getText();
		var description = rand.getText();

		// maker.findsAll('.tab-container .tab').get(1).click();

		maker.finds('.spec_new_app_head_settings').click();
		maker.finds('.spec_new_app_name').sendKeys(name);
		maker.finds('.spec_new_app_description').sendKeys(description).then(cb);
	});

	When(/^the user upload the logo app$/, function(cb) {
		cb();

		/*
			webpage.navTo('/configuration').then(cb);
		*/
	});

	When(/^the user selects the "([^"]*)" size font$/, function(sizeFont, cb) {
		maker.finds('.spec_new_app_setup_size_font_' + sizeFont).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" type font$/, function(typeFont, cb) {
		maker.finds('.spec_new_app_setup_type_font_' + typeFont).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" theme$/, function(typeTheme, cb) {
		maker.finds('.spec_new_app_setup_type_theme_' + typeTheme).click().then(cb);
	});

	When(/^the user selects a random color theme$/, function(cb) {
		var randColor = rand.getColor();
		maker.finds('.spec_new_app_setup_color').sendKeys(randColor).then(cb);
	});

	When(/^the configuration should be saved automatically$/, function(cb) {
		cb();
	});
};