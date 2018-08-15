'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on Pause button$/, function(cb) {
		maker.finds('.pause').click().then(cb);
	});

	When(/^the user pauses the test$/, function(cb) {
		browser.explore();
		cb();
	});

	When(/^the user close the modal in publish$/, function(cb) {
		maker.findsAll('.spec-close-modal').get(1).click().then(cb);
	});

	When(/^the user reactivate the qrvey$/, function(cb) {
		maker.finds('.reactivate').click().then(function(){
			element(by.css('.spec-qrvey-url-share')).getAttribute('value').then(function(res) {
				global.qrveyURL = res;
			});
		}).then(cb);
	});

	When(/^the user changes the question title$/, function(cb) {
		maker.finds('.spec_edit_question_overlay').click();
		maker.finds('.spec-edit-question-name-any').clear().sendKeys('Test edit question title').then(cb);
	});

	When(/^the question name is changed$/, function(cb) {
		maker.finds('.spec-tab-to-desing').click();
		//maker.finds('.spec_edit_question_overlay').click();
		expect(element(by.css('.spec-question-title')).getText()).to.eventually.contain('Test edit question title').and.notify(cb);
	});

	Then(/^the qrvey is activated$/, function(cb) {
		cb();
	});
};