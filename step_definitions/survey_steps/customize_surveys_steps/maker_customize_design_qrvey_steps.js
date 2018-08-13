'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user is logged in$/, function(cb) {
		user.toDoLogin().then(cb);
	});

	Given(/^that the user is editing a qrvey$/, function(cb) {
		user.createsWebform().then(cb);
	});

	Given(/^that the user is editing a "([^"]*)"$/, function(typeOfQrvey, cb) {
		user.createsWebform({
			'title': 'Test Customize ' + typeOfQrvey,
			'description': 'Test description',
			'type': typeOfQrvey
		}).then(cb);
	});

	Given(/^that the user is editing a "([^"]*)" with "([^"]*)" as tittle$/, function(typeOfQrvey, title, cb) {
		user.createsWebform({
			'title': title + ' ' + typeOfQrvey,
			'description': 'Test description',
			'type': typeOfQrvey
		}).then(cb);
	});

	When(/^the user clicks on customize button$/, function(cb) {
		user.waits(2000).then(function(){
			user.finds('.spec-tab-to-customize').click().then(cb);
		});
	});

	When(/^the user opens the "([^"]*)" module$/, function(moduleOption, cb) {
		var i = (moduleOption == 'color') ? 0 : 1;
		user.findsAll('.accordeon-module').get(i).click().then(function() {
			user.waits(3000);
		}).then(cb);
	});

	Then(/^the "([^"]*)" page should be displayed$/, function(arg1, cb) {
		expect(navigate.compareAbsUrlWith(arg1), err.incorrectPage('/' + arg1, cb)).to.eventually.be.true.and.notify(cb);
	});

	Then(/^that qrvey should have the "([^"]*)" template loaded$/, function(arg1, cb) {
		user.finds('.' + arg1).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(cb);
	});

	Then(/^the "([^"]*)" button should be displayed and should have "([^"]*)" as text$/, function(btnName, arg2, cb) {
		var _el = '.spec_' + btnName + '_button';

		user.finds(_el).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(function() {
			user.finds(_el).getAttribute('innerHTML').then(function(_text) {
				expect(_text).to.be.equal(arg2);
			}).then(cb);
		});
	});

	Then(/^the "([^"]*)" button should be displayed$/, function(btnName, cb) {
		expect(navigate.isDisplayed('.spec_' + btnName + '_button')).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the "([^"]*)" title should be displayed$/, function(arg1, cb) {
		user.finds('.spec_customize_title_' + arg1).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(cb);
	});

	Then(/^the "([^"]*)" color option should be displayed$/, function(arg1, callback) {
		user.finds('.spec_customize_color_option_' + arg1).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(callback);
	});

	Given(/^the user clicks on the create survey button$/, function(cb) {
		user.finds('.spec-button-create-survey').click().then(cb);
	});

	Then(/^the user clicks on the "([^"]*)" "([^"]*)" on the "([^"]*)"$/, function(identifier, type, location, cb) {
		navigate.clicksButton('.spec_' + location + '_' + identifier + '_' + type).then(cb);
	});

	Given(/^the user fills "([^"]*)" into the "([^"]*)" field on the "([^"]*)"$/, function(keys, fieldName, location, cb) {
		user.finds('.spec-input-new-' + location.toLowerCase() + '-' + fieldName).sendKeys(keys).then(cb);
	});

	Then(/^the "([^"]*)" button on modal should be displayed$/, function(arg1, cb) {
		expect(navigate.isDisplayed('.spec_customize_' + arg1 + '_button')).to.eventually.be(true).and.notify(cb);
	});

	Then(/^the text "([^"]*)" should be exist$/, function(arg1, cb) {
		user.getsTextExists(arg1).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	Then(/^the "([^"]*)" "([^"]*)" on the "([^"]*)" should be displayed$/, function(identifier, type, location, cb) {
		expect(navigate.isDisplayed('.spec_' + location + '_' + identifier + '_' + type)).to.eventually.be.true.and.notify(cb);
	});
};