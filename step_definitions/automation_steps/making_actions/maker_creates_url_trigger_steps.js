'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the user selects the type of action as load qrvey$/, function(cb) {
		user.finds('.spec-automatiq-select-action-open').click();
		user.finds('.spec-automatiq-select-action-load-qrvey').click().then(cb);
	});

	Then(/^the user selects the king of action as "([^"]*)"$/, function(typeOfQrvey, cb) {
		user.finds('.spec-automatiq-select span').click();
		user.finds('.spec-select-option-' + typeOfQrvey).click().then(cb);
	});

	Then(/^the user opens the trigger url/, function(cb) {
		webpage.waits(2500);
		webpage.openUrl(webhookURL, true).then(cb);
	});

	When(/^the user put the sms message$/, function(cb) {
		var _text = rand.getText(150);
		element(by.css('.subjectSMS')).sendKeys(_text).then(cb);
	});


	Then(/^the qrvey opened is the same selected$/, function(cb) {
		cb();
	});
};
