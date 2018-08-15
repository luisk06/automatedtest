'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has a branch in "([^"]*)" of level (\d+)$/, function(typeOfQrvey, levelBranch, cb) {
		us.isLogged().then(function(_userId) {
			return qs.createBranchs(configer.get('AppID'), _userId, typeOfQrvey, 'level' + levelBranch);
		}).then(function(data) {
			logger.log('data', data);

			user.openUrl(data.url).then(cb);
		});
	});

	When(/^the user selects (\d+) option on level (\d+)$/, function(optionNumber, levelNumber, cb) {
		user.waits(1000).then(function() {
			user.finds('.spec-multiple-choise-option-' + (optionNumber - 1)).click();
			user.findsAll('.spec-user-response-ok').get(levelNumber).click().then(cb);
		});
	});
};