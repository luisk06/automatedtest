'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has added questions and wants to edit them$/, function(cb) {
		maker.createsMultiChoiceTypeQuestion().then(cb);
	});

	When(/^the question turns to edit mode$/, function(cb) {
		maker.finds('.spec-edit-question-name-any').click().then(cb);
	});

	When(/^the user clicks on the question$/, function(cb) {
		maker.finds('.spec-question-container-1').click().then(cb);
	});

	Then(/^the user will be able to edit the content of the question$/, function(cb) {
		maker.finds('.spec-edit-question-name-any').sendKeys('How much you like animals?').then(cb);
	});
};
