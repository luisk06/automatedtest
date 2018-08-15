'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there are required questions left unanswered$/, function(cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'yes_no');
		}).then(function(_data) {
			return webpage.openUrl(_data.url);
		}).then(function() {
			skipSync(true);
			taker.takesQrveyShared().then(cb);
		});
	});

	Then(/^the user should not jump to the finish qrvey page$/, function(cb) {
		var el = '.head-module-answer h2';

		webpage.isDisplayed(el).then(function(isdisplayed) {
			if (!isdisplayed) {
				expect(isdisplayed).to.be.false;
				cb();
			} else {
				cb('Error, the finished qrvey page was found');
			}
		});
	});

	Then(/^the user should jump to login page$/, function(arg1, cb) {
		cb();
	});

	Given(/^that the user has completed all the questions$/, function(cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'yes_no');
		}).then(function(_data) {
			return webpage.openUrl(_data.url);
		}).then(function() {
			skipSync(true);
			return taker.takesQrveyShared();
		}).then(function() {
			return taker.choicesAnswer('yes');
		}).then(function() {
			taker.clicksOnOk().then(cb);
		});
	});

	When(/^the user clicks the user me to qrvey.com button$/, function(cb) {
		webpage.waits(2000);
		taker.finish(false).then(cb);
	});

	Then(/^the user should jump to qrvey page$/, function(cb) {
		expect(webpage.getCurrentUrl()).to.eventually.contain('qrvey.com').and.notify(cb);
	});
};
