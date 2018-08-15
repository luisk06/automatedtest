'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a "([^"]*)" with iframe$/, function(typeOfQrvey, cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, typeOfQrvey, 'multiple_choice').then(function(_data) {
				qrveyIdForIframe = findHashInUrl(_data.url);
			}).then(cb);
		});
	});

	When(/^the user open the "([^"]*)"$/, function(typeOfWidget, cb) {
		brw.ignoreSynchronization = true;
		webpage.openUrl('http://qwidgets.herokuapp.com/widget/' + typeOfWidget + '/q/' + qrveyIdForIframe, true);

		brw.switchTo().frame(element(by.tagName('iframe')).getWebElement());
		cb();
	});

	When(/^the user clicks the Begin button$/, function(cb) {
		//user.finds('.spec-taker-qrvey').click().then(cb);
		//brw.sleep(10000);
		brw.ignoreSynchronization = false;
		cb();
	});
};
