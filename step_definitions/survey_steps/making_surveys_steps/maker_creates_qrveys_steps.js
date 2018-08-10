'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on New Qrvey$/, function(cb) {
		user.finds('.spec_dashboard_create_new_button').click().then(cb);
	});

	When(/^"([^"]*)" is (\d+) chars in "([^"]*)"$/, function(field, length, where, cb) {
		user.finds('.spec-input-new-' + where + '-' + field).getAttribute('value').then(function(_value) {
			expect(_value.length).to.be.most(length);
		}).then(cb);
	});

	When(/^clicks on "([^"]*)"$/, function(nameButton, cb) {
		if (nameButton == 'Create Qrvey') {
			user.finds('.spec-button-create-survey').click().then(cb);
		} else if (nameButton == 'New Qrvey') {
			user.finds('.spec_dashboard_create_new_button').click().then(cb);
		} else if (nameButton == 'Delete') {
			user.touchesDeleteOptionMenuQrvey(cb);
		} else if (nameButton == 'Duplicate') {
			user.touchsDuplicateOptionMenuQrvey(cb);
		}
	});

	When(/^writes "([^"]*)"$/, function(type, cb) {
		if (type == 'name and description') {
			user.finds('.spec-input-new-survey-name').sendKeys('Product Use Satisfaction');
			user.finds('.spec-input-new-survey-description').sendKeys('Please help us to better understand your needs by completing this qrvey. Thank you for your time.').then(cb);
		} else if (type == 'name') {
			user.finds('.spec-input-new-survey-name').sendKeys('Product Use Satisfaction').then(cb);
		} else if (type == 'description') {
			user.finds('.spec-input-new-survey-description').sendKeys('Please help us to better understand your needs by completing this qrvey. Thank you for your time.').then(cb);
		}
	});

	When(/^the user clicks on the qrveys menu$/, function(cb) {
		element(by.css('.spec-qrvey-item-0')).element(by.css('.spec-touch-menu-qrvey')).click().then(cb);
	});

	Then(/^the new qrvey is created as a draft on the dashboard$/, function(cb) {
		navigate.clicksButton('#linkToDashboard');
		expect(user.currentStateQrvey()).to.eventually.have.string('Draft').and.notify(cb);
	});

	Then(/^the survey should be duplicated$/, function(cb) {
		cb();
	});

	Given(/^that the user clicks on create qrvey and assigns a name and description$/, function(cb) {
		user.createsQrvey().then(cb);
	});

	When(/^the user clicks Yes on templates notification$/, function(cb) {
		user.finds('#spec-qrvey-select-template-yes').click().then(cb);
	});

	When(/^clicks one of the previewed templates$/, function(cb) {
		user.finds('.spec-templates-selected-1').click().then(cb);
	});

	When(/^the user open the just created webform$/, function(cb) {
		element.all(by.css('.spec-qrvey-title-link')).get(0).click().then(cb);
	});

	Then(/^the template is chosen and the questions are plugged in to the qrvey$/, function(cb) {
		user.finds('.spec-selected-template-1').click();
		navigate.clicksButton('.spec-use-name-description-of-template').then(cb);
	});

	Then(/^Please enter "([^"]*)" message should be displayed$/, function(arg1, cb) {
		if (arg1 == 'name') {
			expect(user.finds('.spec-create-survey-valid-enter-name').getAttribute('innerHTML')).to.eventually.be.string('Please enter name').and.notify(cb);
		} else if (arg1 == 'description') {
			expect(user.finds('.spec-create-survey-valid-enter-description').getAttribute('innerHTML')).to.eventually.be.string('Please enter description').and.notify(cb);
		}
	});
};