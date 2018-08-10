'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has creates "([^"]*)" qrvey$/, function(typeOfQrvey, cb) {
		if (typeOfQrvey === 'nps') {
			user.createsNps().then(cb);
		} else if (typeOfQrvey === 'polling') {
			user.createsPolling().then(cb);
		}
	});

	Given(/^that the user has creates a "([^"]*)" question$/, function(typeOfQrvey, cb) {
		if (typeOfQrvey === 'nps') {
			user.createsNpsQuestion().then(cb);
		} else if (typeOfQrvey === 'numeric') {
			user.createsNumericTypeQuestion().then(cb);
		}
	});

	When(/^the user clicks on Never Expire$/, function(cb) {
		navigate.clicksButton('.spec-active-never-expire + label').then(cb);
	});
};
