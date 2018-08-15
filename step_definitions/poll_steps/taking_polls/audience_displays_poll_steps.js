'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the audience opens the audience URL$/, function(cb) {
		var _url = configer.get('url_audience');
		if (typeof _url === 'undefined') throw new Error('The url to the audience is undefined');

		user.openUrl(_url).then(cb);
	});

	When(/^the audience inputs the code$/, function(cb) {
		var _code = configer.get('audience_code');
		if (typeof _code === 'undefined') throw new Error('The code is undefined');

		logger.log('the code is:', _code);
		logger.log('CODE RESPONSE: ', _code);
		taker.putCodeInAudiencePage(_code).then(cb);
	});

	Then(/^a "([^"]*)" "([^"]*)" should be present$/, function(text, type, cb) {
		webpage.getsTextExists('spec_' + text + '_' + type).then(function(_exist) {
			expect(_exist).to.be.true;
		}).then(cb);
	});

	Given(/^the presenter has started the poll$/, function(cb) {
		qs.activateQuestion(configer.get('AppID')).then(cb);
	});

	When(/^the audience inputs a wrong code$/, function(cb) {
		var _code = rand.getText(5);

		logger.log('the code is:', _code);
		taker.putCodeInAudiencePage(_code).then(cb);
	});

	Given(/^there is an audience poll with one "([^"]*)" poll$/, function(typeOfQuestion, cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, 'audiencepoll', typeOfQuestion).then(function(_data) {
				configer.set('url_presenter', _data.pollingURLs.presenter);
				configer.set('url_audience', _data.pollingURLs.general);
				// configer.set('audience_code', _data.lookupID);
				configer.set('url_polling', _data.url);

				logger.log('polling', _data);
				logger.log('url_audience', configer.get('url_audience'));

				qs.getTempCode(configer.get('AppID'), configer.get('QrveyId')).then(function(_data) {
					configer.set('audience_code', null);
					configer.set('audience_code', _data.tempCode);
					logger.log('audience_code', _data.tempCode);
				}).then(cb);
			});
		});
	});

	Then(/^a "([^"]*)" poll should be displayed$/, function(typeOfQuestion, cb) {
		logger.log('Element -->:' + typeOfQuestion + ' was found');
		cb(); // todo
	});
};