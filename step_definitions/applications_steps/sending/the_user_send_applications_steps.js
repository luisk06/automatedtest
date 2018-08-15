'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user into the app has (\d+) "([^"]*)"$/, function (num, type, cb) {
		us.isLogged().then(function (_userId) {
			if (type == 'webform') {
				qs.createQrvey(appID, _userId, 'survey', 'multiple_choice', 'draft').then(function (_data) {
					logger.log('qrveys.data.draft', _data);
				}).then(cb);
			} else if (type == 'page') {
				pgs.createsPages('show_messages', appID, 'activate', true).then(cb);
			} else if (type == 'workflow') {
				ps.createsProcess('new_response', true, appID).then(cb);
			}
		});
	});

	Given(/^the user into the app has "([^"]*)" as "([^"]*)" with "([^"]*)" question$/, function (typeOfWebform, state, typeOfQuestion, cb) {
		us.isLogged().then(function (_userId) {
			qs.createQrvey(appID, _userId, typeOfWebform, typeOfQuestion, state).then(function (_data) {
				logger.log(typeOfWebform + '.data.' + state, _data);
			}).then(cb);
		});
	});

	When(/^the user is on the app dashboard$/, function (cb) {
		expect(webpage.getCurrentUrl()).to.eventually.contain('/').and.notify(cb);

	});

	When(/^the user go to the app dashboard$/, function (cb) {
		user.findsAll('.tab-container.tacenter .tab').get(0).click().then(cb);
	});

	When(/^the user clicks on the application menu$/, function (cb) {
		user.finds('.drop').click().then(cb);
	});

	When(/^the user writes an valid email$/, function (cb) {
		user.finds('.contacts_list input').sendKeys(configer.get('username'));
		element(by.model('name')).click();
		user.waits(2000).then(function () {
			cb();
		});
	});

	When(/^the user clicks on the send option$/, function (cb) {
		user.findsAll('.drop .options span').get(0).click().then(cb);
	});

	When(/^the user clicks on the send button$/, function (cb) {
		element(by.linkText('Send')).click().then(cb);
	});

	When(/^the user writes an invalid email$/, function (cb) {
		user.finds('.contacts_list input').sendKeys(rand.getEmail());
		element(by.model('name')).click();
		user.waits(2000).then(function () {
			cb();
		}).then(cb);
	});

	Then(/^the send app notify should be displayed$/, function (cb) {
		var el = '.toast.succesfully';
		webpage.waitsFor(el);

		webpage.isDisplayed(element(by.css(el))).then(function (_isdisplayed) {
			expect(_isdisplayed).to.be.true;
		}, function () {
			cb('Error, the element "' + el + '" is not displayed');
		}).then(cb);
	});

	Then(/^the send button should be disabled$/, function (cb) {
		expect(hasClass(element(by.linkText('Send')), 'disabled')).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the error app notify should be displayed$/, function (cb) {
		var el = '.error-message';

		user.waits(1000).then(function () {
			webpage.isDisplayed(element(by.css(el))).then(function (_isdisplayed) {
				expect(_isdisplayed).to.be.true;
			}, function () {
				cb('Error, the element "' + el + '" is not displayed');
			}).then(cb);
		});
	});

	Then(/^the send application modal should be displayed$/, function (cb) {
		var el = '.modal-dialog';

		user.waits(1000).then(function () {
			webpage.isDisplayed(element(by.css(el))).then(function (_isdisplayed) {
				expect(_isdisplayed).to.be.true;
			}, function () {
				cb('Error, the element "' + el + '" is not displayed');
			}).then(cb);
		});
	});

	Then(/^the application "([^"]*)" should be displayed$/, function (el, cb) {
		user.waits(1000).then(function () {
			webpage.isDisplayed(element(by.model(el))).then(function (_isdisplayed) {
				expect(_isdisplayed).to.be.true;
			}, function () {
				cb('Error, the element "' + el + '" is not displayed');
			}).then(cb);
		});
	});

	Then(/^the application "([^"]*)" should be equal$/, function (el, cb) {
		var textToCompare = (el == 'name') ? appNAME : appDESCRIPTION;

		user.waits(1000).then(function () {
			element(by.model(el)).getAttribute('value').then(function (_text) {
				expect(_text).to.be.equal(textToCompare);
			}, function () {
				cb('Error, the element "' + el + '" is not equal');
			}).then(cb);
		});
	});
};