'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes the numeric question and options$/, function(cb) {
		qrvey.fillNumericQuestion('What is your favorite number?').then(cb);
	});
};
