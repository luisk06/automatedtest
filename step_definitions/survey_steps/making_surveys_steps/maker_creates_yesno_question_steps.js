'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes the "([^"]*)" question options$/, function(questiontype, cb) {
		if (questiontype == 'yes-no'){
			maker.createsYesOrNotQuestion().then(cb);
		}
	});

	When(/^the user writes the question$/, function(cb) {
		qrvey.fillYesNoQuestion('does this main question test work?').then(cb);
	});
};
