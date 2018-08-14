'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a "([^"]*)" with "([^"]*)" question left$/, function(typeOfQrvey, typeOfQuestion, cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, typeOfQrvey, typeOfQuestion);
		}).then(function(_data) {
			logger.log('_url:', _data.url);
			user.openUrl(_data.url).then(cb);
		});
	});

	Given(/^that the user has a "([^"]*)" with "([^"]*)" question left for widgets$/, function(typeOfQrvey, typeOfQuestion, cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, typeOfQrvey, typeOfQuestion);
		}).then(function(_data) {
			logger.log('_url:', _data.url);
			qrveyIDForWidget = findHashInUrl(_data.url);
		}).then(cb);
	});

	Given(/^that the user has a "([^"]*)" with (\d+) questions as draft$/, function(typeOfQrvey, nquestions, cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, typeOfQrvey, 'multiple_questions', 'draft');
		}).then(function() {
			user.navTo('/application/' + appID + '/webforms').then(cb);
		});
	});

	When(/^the user opens the webform user$/, function(cb) {
		logger.log('Qrvey Url: ', qrveyURL);
		user.openUrl(qrveyURL).then(cb);
	});

	When(/^the user take the qrvey on "([^"]*)"$/, function(typeOfQrvey, cb) {
		user.waits(5000);

		brw.ignoreSynchronization = true;

		if (typeOfQrvey == 'nps') cb();
		else {
			if(typeOfQrvey == 'analyzeForm'){
				brw.switchTo().frame(element(by.css('#update-qrvey-iframe')).getWebElement());
			}
			navigate.clicksButton('.spec-taker-qrvey').then(cb);
		}
	});

	When(/^the user take the embedded qrvey$/, function(cb) {
		webpage.waitsFor('.button-cta');
		brw.switchTo().frame(element(by.css('#iframe-icf')));
		user.waits(20000);
		brw.ignoreSynchronization = true;
		user.finds('.spec-taker-qrvey').click().then(cb);
	});

	When(/^the user take the qrvey$/, function(cb) {
		brw.ignoreSynchronization = true;
		navigate.clicksButton('.spec-taker-qrvey').then(cb);
	});

	When(/^the user selects answers in "([^"]*)" question in widget$/, function(typeOfQuestion, cb) {
		user.answersQuestion('short_text-widget').then(cb);
	});
};
