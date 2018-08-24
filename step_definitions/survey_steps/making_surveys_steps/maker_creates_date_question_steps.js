'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the user skip the answer$/, function (cb) {
		maker.finds('.skipbutton.skipbtn').click().then(cb);
	});

	Given(/^the user has login$/, function(cb) {
		webpage.waits(2000);
		maker.toDoLogin().then(cb);
	});

	Given(/^the user created the "([^"]*)"$/, function(type, cb) {
		maker.createsWebform({
			'type': (type == 'form') ? 'forms' : type
		}).then(cb);
	});

	When(/^the user created the "([^"]*)" with "([^"]*)" as title$/, function(type, title, cb) {
		maker.createsWebform({ 'type': type , 'title': title}).then(cb);
	});

	Given(/^the user created the "([^"]*)" with "([^"]*)" question in "([^"]*)"$/, function(typeOfQrvey, typeOfQuestion, stateOfQrvey, cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, typeOfQrvey, typeOfQuestion, stateOfQrvey);
		}).then(function(data){
			cb();
		});
	});

	When(/^the user clicks on the subform option$/, function(cb) {
		maker.finds('.spec-touch-menu-qrvey').click();
		maker.finds('.spec-touch-menu-qrvey-duplicate-option + span').click().then(cb);
	});

	When(/^the user clicks on the "([^"]*)" option in the subform$/, function(option, cb) {
		var idx = 0; // editable

		if(option == 'read_only'){
			idx = 1;
		}else if(option == 'hidden'){
			idx = 2;
		}

		maker.findsAll('.actions-subforms li').get(idx).click().then(cb);
	});

	Then(/^the publish page should be displayed$/, function(cb) {
		expect(
			webpage.getCurrentUrl()
		).to.eventually.contain('share').and.notify(cb);
	});

	Then(/^the publish page should not be displayed$/, function(cb) {
		expect(
			webpage.getCurrentUrl()
		).to.eventually.not.contain('share').and.notify(cb);
	});

	Given(/^the user opens the create webform menu$/, function(cb) {
		maker.finds('.chooseapp-cta').click().then(cb);
	});

	When(/^the user writes the date question$/, function(cb) {
		qrvey.fillDateQuestion('what is your favorite date for testing?').then(cb);
	});

	When(/^the user selects the "([^"]*)" range$/, function(rangeName, cb) {
		maker.finds('.dropdown-trigger').click();
		maker.finds('.spec-maker-range-' + rangeName).click();

		// opening the calendar
		// if (rangeName != 'between') maker.finds('.spec_edit_question_overlay').click();

		var newDate = new Date().getDate();

		// Filling the calendars
		if (rangeName == 'before'){
			maker.finds('.max').click();
			webpage.waitsFor('.mat-calendar');

			maker.findsContainingText('.mat-calendar-body-cell-content', newDate.toString()).click().then(cb);
		}else if (rangeName == 'after'){
			maker.finds('.min').click();
			webpage.waitsFor('.mat-calendar');

			maker.findsContainingText('.mat-calendar-body-cell-content', newDate.toString()).click().then(cb);
		}else if(rangeName == 'between'){
			maker.finds('.max').click();
			webpage.waitsFor('.mat-calendar');
			maker.findsContainingText('.mat-calendar-body-cell-content', newDate.toString()).click();

			maker.finds('.min').click();
			webpage.waitsFor('.mat-calendar');
			maker.findsContainingText('.mat-calendar-body-cell-content', newDate.toString()).click().then(cb);
		}
	});
};
