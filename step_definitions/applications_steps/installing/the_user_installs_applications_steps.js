'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has an app shared$/, function (cb) {
		apps.sharing(appID, configer.get('username'), 'myAppSharedV' + randomId()).then(function (data) {
			expect(data.status).to.be.equal(200);
		}).then(cb);
	});

	When(/^the user go to recived apps$/, function (cb) {
		webpage.waitsFor('.spec-apps-shared-unread');
		user.findsAll('.tab-container .tab').get(1).click().then(cb);
	});

	When(/^the user clicks on the delete option$/, function (cb) {
		user.finds('.drop .options span').click().then(cb);
	});

	When(/^the user clicks on install option$/, function (cb) {
		user.finds('.installApp').click();
		webpage.waits(2000).then(function () {
			cb();
		});
	});

	When(/^the user accepts to delete the application$/, function (cb) {
		var el = '.button.yellow.spec-delete-qrvey-confirm';
		user.finds(el).click().then(cb);
	});

	Then(/^the user should not have applications shared$/, function (cb) {
		var el = '.my-apps';

		webpage.isDisplayed(element(by.css(el))).then(function (_isdisplayed) {
			expect(_isdisplayed).to.be.true;
		}, function () {
			cb('Error, the element "' + el + '" is not displayed');
		}).then(cb);
	});

	Then(/^the tab should be changed by applications$/, function (cb) {
		var el = '.error-message';

		webpage.waits(1000).then(function () {
			webpage.isDisplayed(element(by.css(el))).then(function (_isdisplayed) {
				expect(_isdisplayed).to.be.true;
			}, function () {
				cb('Error, the element "' + el + '" is not displayed');
			}).then(cb);
		});
	});

	Then(/^the application installed notify should be displayed$/, function (cb) {
		var el = '.toast.succesfully';
		webpage.waitsFor(el);

		webpage.isDisplayed(element(by.css(el))).then(function (_isdisplayed) {
			expect(_isdisplayed).to.be.true;
		}, function () {
			cb('Error, the element "' + el + '" is not displayed');
		}).then(cb);
	});

	Then(/^there should be (\d+) applications installed$/, function (num, cb) {
		webpage.waits(200);

		user.findsAll('.my-apps .module').count().then(function (_count) {
			expect(_count).to.be.equal(+num + 1);
		}).then(cb);
	});
};