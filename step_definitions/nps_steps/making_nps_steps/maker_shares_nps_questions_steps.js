'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has creates "([^"]*)" qrvey$/, function(typeOfQrvey, cb) {
		if (typeOfQrvey === 'nps') {
			maker.createsNps().then(cb);
		} else if (typeOfQrvey === 'polling') {
			maker.createsPolling().then(cb);
		}
	});

	Given(/^that the user has creates a "([^"]*)" question$/, function(typeOfQrvey, cb) {
		if (typeOfQrvey === 'nps') {
			maker.createsNpsQuestion().then(cb);
		} else if (typeOfQrvey === 'numeric') {
			maker.createsNumericTypeQuestion().then(cb);
		}
	});

	When(/^the user clicks on Never Expire$/, function(cb) {
		maker.finds('.spec-active-never-expire + label').click().then(cb);
	});
};
