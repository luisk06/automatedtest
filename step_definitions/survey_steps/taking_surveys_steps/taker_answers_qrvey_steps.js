'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there are required questions left unanswered$/, function(cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'yes_no');
		}).then(function(_data) {
			return user.openUrl(_data.url);
		}).then(function() {
			skipSync(true);
			user.takesQrveyShared().then(cb);
		});
	});

	Then(/^the user should not jump to the finish qrvey page$/, function(cb) {
		var el = '.head-module-answer h2';

		user.isDisplayed(el).then(function(isdisplayed) {
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
			return user.openUrl(_data.url);
		}).then(function() {
			skipSync(true);
			return user.takesQrveyShared();
		}).then(function() {
			return user.choicesAnswer('yes');
		}).then(function() {
			user.takerClicksOnOk().then(cb);
		});
	});

	When(/^the user clicks the user me to qrvey.com button$/, function(cb) {
		user.waits(2000);
		user.takerFinish(false).then(cb);
	});

	Then(/^the user should jump to qrvey page$/, function(cb) {
		expect(user.whereIAm()).to.eventually.contain('qrvey.com').and.notify(cb);
	});
};
