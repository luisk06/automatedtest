'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a "([^"]*)" with a jump-to-question branch on a "([^"]*)" question$/, function(typeOfQrvey, typeOfQuestion, cb) {
		us.isLogged().then(function(_userId) {
			var questionType = '';

			switch (typeOfQuestion) {
				case 'multiple choice':
					questionType = 'jump_to_mc';
					break;
				case 'yes-no':
					questionType = 'jump_to_yesno';
					break;
				case 'image':
					questionType = 'jump_to_image';
					break;
			}

			qs.createBranchs(configer.get('AppID'), _userId, typeOfQrvey, questionType).then(function(data) {
				logger.log('data', data);

				user.openUrl(data.url).then(cb);
			});
		});
	});

	Given(/^that the user has a "([^"]*)" with a jump-to-end branch$/, function(typeOfQrvey, cb) {
		us.isLogged().then(function(_userId) {
			qs.createBranchs(configer.get('AppID'), _userId, typeOfQrvey, 'jump_to_end').then(function(data) {
				logger.log('data', data);

				user.openUrl(data.url).then(cb);
			});
		});
	});

	When(/^the user selects answers entangled to jump-to-question "([^"]*)" branch$/, function(typeOfQuestion, cb) {
		switch (typeOfQuestion) {
			case 'multiple choice':
				element(by.css('.spec-multiple-choise-option-0')).click().then(cb);
				break;
			case 'yes-no':
				element(by.css('.spec-answer-yesno-question-option-yes')).click().then(cb);
				break;
			case 'image':
				element(by.css('.spec-image-option-0')).click().then(cb);
				break;
		}
	});

	When(/^the user selects answers entangled to jump-to-end branch$/, function(cb) {
		element(by.css('.spec-multiple-choise-option-0')).click().then(cb);
	});

	When(/^the user selects answers not-entangled to jump-to-end branch$/, function(cb) {
		element(by.css('.spec-multiple-choise-option-1')).click().then(cb);
	});

	When(/^the user click submit button on "([^"]*)"$/, function(typeOfQrvey, cb) {
		if (typeOfQrvey == 'questionnaire') {
			element(by.css('.spec-user-response-ok.submit-answers')).click().then(function() {
				user.waits(2000);
			}).then(cb);
		} else cb();
	});

	When(/^the user selects answers not-entangled to jump-to-question "([^"]*)" branch$/, function(typeOfQuestion, cb) {
		switch (typeOfQuestion) {
			case 'multiple choice':
				element(by.css('.spec-multiple-choise-option-1')).click().then(cb);
				break;
			case 'yes-no':
				element(by.css('.spec-answer-yesno-question-option-no')).click().then(cb);
				break;
			case 'image':
				element(by.css('.spec-image-option-1')).click().then(cb);
				break;
		}
	});

	When(/^the user should jump to a question with title "([^"]*)"$/, function(questionTitle, cb) {
		user.waits(2000);

		// brw.enterRepl();

		element(by.xpath('//*[contains(text(),"' + questionTitle + '")]')).isDisplayed().then(function(_isDisplayed) {
			expect(_isDisplayed).to.be.true;
		}, function() {
			throw new Error('Question title: ' + questionTitle + 'is not present on page');
		}).then(cb);
	});
};