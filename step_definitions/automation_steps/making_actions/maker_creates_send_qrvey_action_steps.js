'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user select "([^"]*)" as via to send qrvey$/, function(_via, cb) {
		if(_via == 'sms') maker.finds('.spec-chk-state-sms').click().then(cb);
		else maker.finds('.spec-chk-state-email').click().then(cb);
	});
};