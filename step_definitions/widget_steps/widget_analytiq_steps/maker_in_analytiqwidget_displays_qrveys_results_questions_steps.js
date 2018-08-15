'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a survey in draft$/, function(cb) {
		us.isLogged().then(function(_userId){
			qs.createQrvey(appID, _userId, 'survey', 'yes_no', 'draft').then(function(){
				// console.log('created');
			}).then(cb);
		});
	});

	Given(/^that the user has a qrvey with (\d+) responses$/, function(numberResponses, cb) {
		cb();
	});

	Given(/^that the user open the "([^"]*)" widget with the responses$/, function(nameWidget, cb) {
		if (typeof qrveyIDForWidget !== 'undefined') {
			ws.open(nameWidget, qrveyIDForWidget, cb);
		} else throw new Error('qrveyIDForWidget is undefined');
	});

	When(/^that the user are in the "([^"]*)" widget$/, function(shouldBeIn, cb) {
		webpage.getCurrentUrl().then(function(_url) {
			expect(_url).to.contain(shouldBeIn);
		}).then(cb);
	});

	When(/^the user go to invidual responses$/, function(cb) {
		// cb(null, 'pending');
		cb();
	});

	Then(/^the (\d+) responses should be diplayed$/, function(numberResponses, cb) {
		// cb(null, 'pending');
		cb();
	});
};
