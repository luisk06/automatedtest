'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user created a "([^"]*)" question$/, function(typeOfQuestion, cb) {
		user.createsQuestionByType(typeOfQuestion).then(function() {
			if (typeOfQuestion == 'multiple choice' || typeOfQuestion == 'multiple_choice' || typeOfQuestion == 'multiple-choice') {
				user.createsMultiChoiceOptions(2).then(cb);
			} else cb();
		});
	});

	When(/^the user open the preview$/, function(cb) {
		user.finds('.spec-design-preview-button').click().then(cb);
	});

	When(/^the user change for the preview$/, function(cb) {
		user.changeWindow(1).then(cb);
	});

	Then(/^the user should enter her email$/, function(cb) {
		user.finds('.textfield-area').sendKeys(configer.get('username')).then(cb);
	});

	Then(/^the user clicks on OK button$/, function(cb) {
		user.takerClicksOnOk().then(cb);
	});

	Then(/^the user clicks on Close this Windows button$/, function(cb) {
		var el = '.close-w-desktop';

		user.waitsFor(el);
		element(by.css(el)).click().then(cb);
	});

	Given(/^that the user stay in the first window$/, function(cb) {
		user.closesOtherWindows();
		user.changeWindow(0).then(cb);
	});
};
