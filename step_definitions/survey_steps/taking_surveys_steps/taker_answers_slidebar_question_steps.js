'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user answers a Slidebar with (.*) stops$/, function(numbersStops, cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'slide_bar', 'active', numbersStops);
		}).then(function(_data) {
			user.openUrl(_data.url).then(cb);
		});
	});

	When(/^the user selects they stop$/, function(cb) {
		brw.ignoreSynchronization = true;

		maker.movesSlidebar(1200);
		maker.movesSlidebar(-1200).then(function(){
			cb();
		});
	});

	When(/^clicks on Ok$/, function(cb) {
		taker.clicksOnOk().then(function () {
			cb();
		});
	});
};
