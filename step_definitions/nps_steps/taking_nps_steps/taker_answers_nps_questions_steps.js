'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var okTakerButton = '.button.yellow.okbtn.ico-check.spec-user-response-ok';

	Given(/^that the user has a nps question$/, function(cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'nps', 'nps');
		}).then(function(_data) {
			user.openUrl(_data.url).then(cb);
		});
	});

	When(/^the user answers the "([^"]*)" question$/, function(typeOfQuestion, cb) {
		skipSync(true);
		user.answersQuestion(typeOfQuestion).then(cb);
	});

	When(/^clicks on the Ok button again$/, function(cb) {
		user.finds(okTakerButton).click().then(cb);
	});

	When(/^the user clicks on OK button in the preview$/, function(cb) {
		var el = '.button.yellow.okbtn.ico-check.spec-user-response-ok';

		webpage.waitsFor(el); // Wait for other element finish to load
		user.finds(el).click().then(cb);
	});
};
