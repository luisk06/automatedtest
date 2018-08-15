'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on New Qrvey$/, function(cb) {
		maker.finds('.spec_dashboard_create_new_button').click().then(cb);
	});

	When(/^"([^"]*)" is (\d+) chars in "([^"]*)"$/, function(field, length, where, cb) {
		maker.finds('.spec-input-new-' + where + '-' + field).getAttribute('value').then(function(_value) {
			expect(_value.length).to.be.most(length);
		}).then(cb);
	});

	When(/^clicks on "([^"]*)"$/, function(nameButton, cb) {
		if (nameButton == 'Create Qrvey') {
			maker.finds('.spec-button-create-survey').click().then(cb);
		} else if (nameButton == 'New Qrvey') {
			maker.finds('.spec_dashboard_create_new_button').click().then(cb);
		} else if (nameButton == 'Delete') {
			maker.touchesDeleteOptionMenuQrvey(cb);
		} else if (nameButton == 'Duplicate') {
			maker.touchsDuplicateOptionMenuQrvey(cb);
		}
	});

	When(/^writes "([^"]*)"$/, function(type, cb) {
		if (type == 'name and description') {
			maker.finds('.spec-input-new-survey-name').sendKeys('Product Use Satisfaction');
			maker.finds('.spec-input-new-survey-description').sendKeys('Please help us to better understand your needs by completing this qrvey. Thank you for your time.').then(cb);
		} else if (type == 'name') {
			maker.finds('.spec-input-new-survey-name').sendKeys('Product Use Satisfaction').then(cb);
		} else if (type == 'description') {
			maker.finds('.spec-input-new-survey-description').sendKeys('Please help us to better understand your needs by completing this qrvey. Thank you for your time.').then(cb);
		}
	});

	When(/^the user clicks on the qrveys menu$/, function(cb) {
		element(by.css('.spec-qrvey-item-0')).element(by.css('.spec-touch-menu-qrvey')).click().then(cb);
	});

	Then(/^the new qrvey is created as a draft on the dashboard$/, function(cb) {
		maker.finds('#linkToDashboard').click();
		expect(maker.currentStateQrvey()).to.eventually.have.string('Draft').and.notify(cb);
	});

	Then(/^the survey should be duplicated$/, function(cb) {
		cb();
	});

	Given(/^that the user clicks on create qrvey and assigns a name and description$/, function(cb) {
		maker.createsWebform().then(cb);
	});

	When(/^the user clicks Yes on templates notification$/, function(cb) {
		maker.finds('#spec-qrvey-select-template-yes').click().then(cb);
	});

	When(/^clicks one of the previewed templates$/, function(cb) {
		maker.finds('.spec-templates-selected-1').click().then(cb);
	});

	When(/^the user open the just created webform$/, function(cb) {
		maker.findsAll('.spec-qrvey-title-link').get(0).click().then(cb);
	});

	Then(/^the template is chosen and the questions are plugged in to the qrvey$/, function(cb) {
		maker.finds('.spec-selected-template-1').click();
		maker.finds('.spec-use-name-description-of-template').click().then(cb);
	});

	Then(/^Please enter "([^"]*)" message should be displayed$/, function(arg1, cb) {
		if (arg1 == 'name') {
			expect(
				maker.finds('.spec-create-survey-valid-enter-name').getText()
			).to.eventually.be.string('Please enter name').and.notify(cb);
		} else if (arg1 == 'description') {
			expect(
				maker.finds('.spec-create-survey-valid-enter-description').getText()
			).to.eventually.be.string('Please enter description').and.notify(cb);
		}
	});
};