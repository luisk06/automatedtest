'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has a checklist qrvey$/, function (cb) {
		us.isLogged().then(function (_userId) {
			qs.createQrvey(appID, _userId, 'checklist').then(function (data) {
				logger.log('data', data);
				webpage.openUrl(data.url);
			}).then(cb);
		});
	});

	When(/^the user enter "([^"]*)" email$/, function (emailFormat, cb) {
		var email = '';

		if (emailFormat == 'correct') {
			email = 'carlos.llanos@qrvey.com';
		} else {
			email = 'wrong.format.com';
		}

		element(by.css('input[type=email]')).sendKeys(email).then(cb);
	});

	When(/^the user clicks the submit button$/, function (cb) {
		user.finds('.ico-check.spec-user-response-ok').click().then(cb);

		// webpage.waits(600, function(){
		// 	logger.log('voy a hacer el click');
		// 	element(by.css('.spec-save-google-sheet-button')).click().then(cb);
		// });
	});

	When(/^the user check (\d+) option$/, function (optionsToCheck, cb) {
		var listOfOptions = element.all(by.repeater('answer in question.answers'));
		expect(listOfOptions.count()).to.eventually.be.at.least(optionsToCheck).and.then(function () {
			for (var i = 0; i < optionsToCheck; i++) {
				listOfOptions.get(i).click();
			}
		}).then(cb);
	});

	Then(/^the user should be on thankyou page$/, function (cb) {
		var el = '.new-end-page';

		webpage.waitsFor(el);
		user.finds(el).isDisplayed().then(function (_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});

	Then(/^the qrveys stays on same the question$/, function (cb) {
		var el = '.spec-user-response-ok';

		webpage.waitsFor(el);
		element(by.css(el)).isDisplayed().then(function (_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});
};