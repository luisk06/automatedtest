'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a webform app with a "([^"]*)" with a "([^"]*)" question that has (\d+) answers and (\d+) "([^"]*)"$/, function(typeOfQrvey, typeOfQuestion, num, filtered, text, cb) {
		if (typeOfQuestion == 'short text' || typeOfQuestion == 'short-text') {
			us.isLogged().then(function(_userId) {
				apps.createNewApp('Test ' + typeOfQrvey + ' ' + typeOfQuestion).then(function(){
					as.shorttextQuestion(_userId, typeOfQrvey, num, null, filtered, text).then(function() {}).then(cb);
				});
			});
		} else if (typeOfQuestion == 'long text' || typeOfQuestion == 'long-text') {
			us.isLogged().then(function(_userId) {
				apps.createNewApp('Test ' + typeOfQrvey + ' ' + typeOfQuestion).then(function(){
					as.longtextQuestion(_userId, typeOfQrvey, num, null, filtered, text).then(function() {}).then(function(){
						webpage.waits(5000);
					}).then(cb);
				});
			});
		}
	});

	When(/^the user clicks on multi-panel view$/, function(cb) {
		webpage.waits(3500).then(function() {
			user.finds('.spec-filter-analyze').click().then(function() {
				user.finds('#spec-panelview-multi').click().then(cb);
			});
		});
	});
};
