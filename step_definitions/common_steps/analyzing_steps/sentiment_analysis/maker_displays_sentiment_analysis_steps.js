'use strict';

module.exports = function() {
	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a webform app with a "([^"]*)" with a Short text question that has (\d+) answers for sentiment analysis$/, function(typeOfQrvey, num, cb) {
		webpage.getsTextExists();

		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test Sentiment Analysis').then(function(appData){
				appID = appData.appid;
				as.createAnswers(_userId, typeOfQrvey, 'short text sentiment', num).then(function(){
					webpage.waits(5000);
				}).then(cb);
			});
		});
	});

	Then(/^the user selects the sentiment option in the dropdown$/, function(cb){
		element(by.css('.dropdown-range .dropdown .selected')).click().then(function(){
			element.all(by.css('.dropdown-range .dropdown span')).get(4).click().then(cb);
		});
	});

	Then(/^must have more than (\d+) negative answers$/, function(negative, cb){
		element(by.css('.spec-sentiment-number')).getText().then(function(number){
			expect(number).to.be.at.least(1);
		}).then(cb);
	});
};