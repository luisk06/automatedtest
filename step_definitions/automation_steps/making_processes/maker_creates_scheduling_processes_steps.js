'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user creates a "([^"]*)" in "([^"]*)" app$/, function (typeOf, typeOfApp, cb) {
		if (typeOfApp == 'automation') {
			maker.createsProcess().then(cb);
		}
	});

	Given(/^the user creates a "([^"]*)" in "([^"]*)" app with "([^"]*)" as title$/, function (typeOf, typeOfApp, title, cb) {
		if (typeOfApp == 'automation') {
			maker.createsProcess(title).then(cb);
		} else throw new Error('Not a valid app');
	});

	When(/^the user selects the king of process as "([^"]*)"$/, function (typeOfProcess, cb) {
		user.waits(2000).then(function () {
			user.finds('.spec-automatiq-select-type').click();
			user.finds('.spec-automatiq-type-' + typeOfProcess).click().then(cb);
		});
	});

	When(/^the user selects the king of repeater as "([^"]*)"$/, function (typeOfRepeater, cb) {
		user.finds('.spec-selects-process').click();
		user.finds('.spec-automation-repeater-open').click();
		user.finds('.spec-automation-selects-repeater-' + typeOfRepeater).click().then(cb);
	});

	When(/^the user selects the king of repeater every as (\d+) days$/, function (numDays, cb) {
		user.finds('.spec-automation-selects-repeater-every').sendKeys(numDays).then(cb);
	});

	When(/^the user selects the start Date$/, function (cb) {
		var today = new Date();

		user.finds('.spec-automation-selects-start-date').click().then(function () {
			user.finds('[data-date="' + today.getDate() + '"]').click().then(cb);
		});
	});

	When(/^the user selects the hours to every day as (\d+):(\d+) in "([^"]*)"$/, function (hours, minutes, timezone, cb) {
		user.finds('.spec-automation-selects-time').sendKeys(hours + ': ' + minutes);
		user.finds('.spec-automation-selects-timezone').click();
		user.finds('.spec-automation-selects-timezone-' + timezone).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" check$/, function (nameCheck, cb) {
		user.finds('.spec-automation-selects-' + nameCheck).click().then(cb);
	});

	When(/^the user selects the specific date to finish$/, function (cb) {
		var today = new Date();
		today = today.getDate() + 1;

		if (today == 30) today -= 1;

		user.finds('.spec-automation-selects-end-date').click().then(function () {
			user.findsAll('[data-date="' + today + '"]').get(1).click().then(cb);
		});
	});

	When(/^the user selects the end time after (\d+) times$/, function (times, cb) {
		user.finds('.spec-automation-selects-after-times').clear().sendKeys(times).then(cb);
	});

	When(/^the user clicks on Save Changes$/, function (cb) {
		user.waits(1000).then(function () {
			user.finds('.spec-automation-btn-save').click().then(cb);
		});
	});

	Then(/^the user go to back the dashabord$/, function (cb) {
		expect(webpage.getCurrentUrl()).to.eventually.be.equal('/').and.notify(cb);
	});
};