'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on the "([^"]*)" option in apps$/, function(option, cb) {
		var el = '.spec-new-app-select-module-' + option;

		webpage.waitsFor(el);
		maker.finds(el).click().then(cb);
	});

	When(/^the user clicks on the new app$/, function(cb) {
		maker.finds('.close-modal-choose').click();
		maker.findsAll('.my-apps .module:not(.create-app)').get(0).click().then(cb);
	});

	When(/^the user clicks on the create aplication buttton$/, function(cb) {
		maker.finds('.spec-create-new-app-btn').click().then(cb);
	});

	When(/^the user types the aplication name$/, function(cb) {
		maker.finds('.spec-create-new-app-input-name').sendKeys(rand.getText(5)).then(cb);
	});

	When(/^the user types the aplication description$/, function(cb) {
		maker.finds('.spec-create-new-app-input-description').sendKeys(rand.getText(5)).then(cb);
	});

	When(/^the user clicks on the next button$/, function(cb) {
		maker.finds('.spec-create-new-app-next-btn').click().then(cb);
	});

	When(/^the user clicks on the "([^"]*)" option$/, function(option, cb) {
		maker.finds('.spec_dropdown_create_' + option + '_button').click().then(cb);
	});

	When(/^the user clicks on the "([^"]*)" navbar option$/, function(option, cb) {
		maker.finds('.spec_' + option + '_button').click().then(cb);
	});

	When(/^the user clicks on the create form scratch button$/, function(cb) {
		// maker.finds('.spec-button-create-forms').click().then(cb);
		maker.finds('.spec_dropdown_create_forms_button').click().then(cb);
	});

	When(/^the user clicks on the create "([^"]*)" scratch button in the first use$/, function(typeOfQrvey, cb) {
		if (typeOfQrvey != 'forms'){
			console.log('typeOfQrvey', typeOfQrvey);
			// brw.enterRepl();
			maker.finds('.spec_dropdown_create_' + typeOfQrvey + '_button').click();
		}

		maker.finds('.spec-button-create-' + typeOfQrvey).click().then(cb);
	});

	Then(/^the user must be into the "([^"]*)" builder of "([^"]*)"$/, function (place, typeOfQrvey, cb) {
		var title = '';
		if(typeOfQrvey == 'forms'){
			title = capitalize('form');
		} else title = (typeOfQrvey == 'nps') ? typeOfQrvey.toUpperCase() : capitalize(typeOfQrvey);

		var el = '';
		if (typeOfQrvey == 'forms' || typeOfQrvey == 'checklist' || typeOfQrvey == 'quiz') {
			el = '.texts .name';
		} else if (typeOfQrvey == 'survey' || typeOfQrvey == 'nps') {
			el = '.qr-breadcrumbs-info-title';
		}

		expect(maker.finds(el).getText()).to.eventually.be.equal('Untitled ' + title);
		expect(webpage.getCurrentUrl()).to.eventually.contain('/application/');
		expect(webpage.getCurrentUrl()).to.eventually.contain('/design/').and.notify(cb);
	});
};