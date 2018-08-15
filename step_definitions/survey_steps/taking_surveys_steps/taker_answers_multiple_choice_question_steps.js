'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user answers a qrvey with a multiple choice question$/, function(cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'multiple_choice');
		}).then(function(_data) {
			webpage.openUrl(_data.url).then(cb);
		});
	});

	Given(/^that the user answers a qrvey with a multiple choice question with other question$/, function(cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'multiple_choice', 'active', 'with_other_option');
		}).then(function(_data) {
			webpage.openUrl(_data.url).then(cb);
		});
	});

	Given(/^that the user answers a qrvey with a multiple choice question with allow multiple selections$/, function(cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'multiple_choice', 'active', 'with_allow_multiple_selections');
		}).then(function(_data) {
			return webpage.openUrl(_data.url).then(cb);
		});
	});

	Given(/^that the user answers a qrvey with a multiple choice question with allow multiple selections and Other option$/, function(cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'multiple_choice', 'active', 'with_both');
		}).then(function(_data) {
			webpage.openUrl(_data.url).then(cb);
		});
	});

	When(/^the user selects the desired answer choice$/, function(cb) {
		taker.choicesAnswer('multiple').then(cb);
	});

	When(/^the user selects the Other option$/, function(cb) {
		taker.finds('.spec-multiple-choise-option-other').click().then(cb);
	});

	When(/^the user selects the Other option again$/, function(cb) {
		taker.finds('.spec-other-write-awnswer').click().then(cb);
	});

	When(/^writes their answer$/, function(cb) {
		taker.finds('.spec-multiple-choise-option-other').sendKeys('My own answer').then(cb);
	});

	When(/^clicks on the Ok button$/, function(cb) {
		taker.clicksOnOk().then(cb);
	});

	When(/^the user selects (\d+) answer choices$/, function(numberOfAnswers, cb) {
		taker.touchsMultipleAnswers(numberOfAnswers).then(cb);
	});

	When(/^the user selects (\d+) answer choices in the widget$/, function(numberOfAnswers, cb) {
		skipSync(true);
		taker.touchsMultipleAnswers(numberOfAnswers).then(cb);
	});

	When(/^selects the "([^"]*)" option$/, function(arg1, cb) {
		cb();
	});

	When(/^writes their own answer$/, function(cb) {
		taker.writesOtherAnswer('My own other answer').then(cb);
	});
};
