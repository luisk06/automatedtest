'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^there is a poll$/, function(cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, 'audiencepoll', 'multiple_choice').then(function(_data) {
				configer.set('url_presenter', _data.pollingURLs.presenter);
				configer.set('url_audience', _data.pollingURLs.general);
				configer.set('audience_code', _data.lookupID);
				configer.set('url_polling', _data.url);

				logger.log('polling', _data);
				logger.log('url_presenter', configer.get('url_presenter'));
			}).then(cb);
		});
	});

	Given(/^the presenter opens the poll url$/, function(cb) {
		user.openUrl(configer.get('url_presenter')).then(function() {
			webpage.getCurrentUrl().then(function(_url) {
				logger.log('getCurrentUrl', _url);
				expect(_url).to.be.contain('poll-view');
			}).then(cb);
		});
	});

	Then(/^a "([^"]*)" "([^"]*)" should not be displayed on the "([^"]*)"$/, function(identifier, type, location, cb) {
		var _el = '.spec_' + location + '_' + identifier + '_' + type;
		expect(webpage.isDisplayed(_el), err.elementNotFound(_el, type)).to.eventually.be.false.and.notify(cb);
	});

	Then(/^a "([^"]*)" "([^"]*)" should be displayed on the "([^"]*)" as a svg$/, function(identifier, type, location, cb) {
		var _el = '.spec_' + location + '_' + identifier + '_' + type + ' svg';

		webpage.waitsFor(_el).then(function() {
			expect(webpage.isDisplayed(_el), err.elementNotFound(_el, type)).to.eventually.be.true.and.notify(cb);
		});
	});

	When(/^the poll gets an answer$/, function(cb) {
		var _url = configer.get('url_polling');
		as.createAnswersForMultipleChoiceQuestionByUrl(1, _url, 'polling').then(cb);
	});

	Then(/^the number of answers should be (\d+) more$/, function(numberOfAnswers, cb) {
		var _el = '.spec_polling_presenter_poll_results_graphic svg';

		webpage.waitsFor(_el).then(function() {
			user.waits(2500).then(function() {
				user.finds('.spec_polling_presenter_counter_answers').getAttribute('innerHTML').then(function(_html) {
					expect(_html).to.be.equal('Answered: ' + numberOfAnswers);
				}).then(cb);
			});
		});
	});

	Then(/^a "([^"]*)" "([^"]*)" should not be displayed$/, function(identifier, type, cb) {
		var _element = by.css('.spec_' + identifier + '_' + type);
		user.waits(1000).then(function(){
			webpage.waitsFor(_element);
			cb();
		});
	});

	When(/^the next poll is loaded$/, function(cb) {
		// cb(null, 'pending');
		cb();
	});
};