'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a webform app with a "([^"]*)" with a date question that has (\d+) answers with the following dates:$/, function(typeSurvey, num, datesArray, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test ' + typeSurvey + ' date').then(function(){
				as.dateQuestion(_userId, typeSurvey, num, datesArray.rows()).then(function(){
					webpage.waits(5000);
				}).then(cb);
			});
		});
	});
};