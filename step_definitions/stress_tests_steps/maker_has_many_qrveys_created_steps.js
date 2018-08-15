'use strict';

module.exports = function() {
	
	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has (\d+) qrveys in the dashboard$/, function(numberOfQrvey, cb) {
		us.isLogged().then(function(_userId) {
			qs.createManyQrvey(_userId, 'survey', 'date', numberOfQrvey).then(cb);
		});
	});

	Given(/^that the user has "([^"]*)" created with "([^"]*)" as question and (\d+) answers$/, function(typeOfQrvey, typeOfQuestion, numberOfQrvey, cb) {
		us.isLogged().then(function(_userId) {
			as.createAnswers(_userId, typeOfQrvey, typeOfQuestion, numberOfQrvey).then(cb);
		});
	});
};
