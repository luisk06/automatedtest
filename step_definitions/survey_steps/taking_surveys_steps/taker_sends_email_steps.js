'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var today,
		qrveyUrl = null;

	Given(/^that the user has answered all required questions$/, function(cb) {
		if (qrveyUrl === null) {
			qrveyUrl = qrvey.getQrveyUrl();
		}

		var timeStamp = new Date();
		today = timeStamp.getDate();
		brw.ignoreSynchronization = true;
		brw.get(qrveyUrl).then(function() {
			qrvey.pressTakeQrvey().then(function() {
				element(by.binding('question.text')).getText().then(function(questionName) {
					qrvey.setQrveyQuestionName(questionName);
					navigate.clicksButton('.spec-taker-date-answer-input');
					navigate.clicksButton('[data-date="' + today + '"]');
					navigate.clicksButton('.spec-user-response-ok').then(cb);
				});
			});
		});
	});

	//widget taker
	Given(/^the user has answered all required questions$/, function(cb) {
		var timeStamp = new Date();
		today = timeStamp.getDate();
		brw.ignoreSynchronization = true;

		element(by.binding('question.text')).getText().then(function() {
			navigate.clicksButton('.spec-taker-date-answer-input');
			navigate.clicksButton('[data-date="' + today + '"]');
			navigate.clicksButton('.spec-user-response-ok').then(cb);
		});
	});

	Given(/^that the user has provided an email$/, function(cb) {
		navigate.sendKeys('.spec-user-email-field-confirm', configer.get('username')).then(cb);
	});

	When(/^the user clicks the Done button$/, function(cb) {
		navigate.clicksButton('.spec-done-submit-take-qrvey').then(cb);
	});

	Then(/^the login page should be displayed with username$/, function(cb) {
		skipSync(false);
		expect(webpage.getCurrentUrl()).to.eventually.equal('/login?email=' + configer.get('username') + '&taken=true').and.notify(cb);
	});

	Given(/^that the user has provided an email that's already been saved$/, function(cb) {
		navigate.sendKeys('.spec-user-email-field-confirm', configer.get('username')).then(cb);
	});

	Then(/^a "([^"]*)" chart should be displayed$/, function(arg1, cb) {
		brw.driver.switchTo().activeElement();
		skipSync(false);

		user.getText('.modal-box .wrapper .sub').then(function(_text) {
			expect(_text).to.equal(arg1);
		}).then(cb);
	});
};