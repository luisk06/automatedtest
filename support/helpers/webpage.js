'use strict';

var Webpage = function () {
	this.settings = {};
};

Webpage.prototype.setSetting = function (_key, _val) {
	this.settings[_key] = _val;
};

Webpage.prototype.getCurrentUrl = function () {
	return brw.getCurrentUrl();
};

Webpage.prototype.getSetting = function (_key) {
	return this.settings[_key];
};

Webpage.prototype.waitForAngular = function (_time) {
	return brw.waitForAngular();
};

Webpage.prototype.waits = function (_time) {
	if (typeof _time !== 'number') throw new Error('The time should be numeric');
	return brw.sleep(_time);
};

Webpage.prototype.deleteAllCookies = function () {
	return brw.driver.manage().deleteAllCookies();
};

Webpage.prototype.getCookies = function () {
	return brw.driver.manage().getCookies();
};

Webpage.prototype.refresh = function () {
	return brw.navigate().refresh();
};

Webpage.prototype.goTo = function (_slug) {
	var deferred = protractor.promise.defer();
	skipSync(false);

	this.deleteAllCookies();
	brw.get(brw.baseUrl + _slug).then(function () {
		if (_slug == '/login') {
			_this.waitsFor('.spec-login-btn');
			deferred.fulfill();
		} else if (_slug == '/register') {
			_this.waitsFor('.spec-register-btn');
			deferred.fulfill();
		} else deferred.fulfill();
	});

	return deferred.promise;
};

Webpage.prototype.goToHome = function () {
	var deferred = protractor.promise.defer();
	var _this = this;

	this.deleteAllCookies();
	brw.get('http://www.qrvey.com').then(function () {
		_this.waits(500);
		deferred.fulfill();
	});

	return deferred.promise;
};

Webpage.prototype.openUrl = function (_custom, _sw) {
	var deferred = protractor.promise.defer();
	var _this = this;

	if (typeof _sw === 'undefined' || _sw === false) skipSync(false);

	this.deleteAllCookies();
	brw.get(_custom).then(function () {
		_this.waits(2000);
		deferred.fulfill();
	});

	return deferred.promise;
};

Webpage.prototype.navTo = function (_slug) {
	var deferred = protractor.promise.defer();
	var _this = this;

	brw.get(brw.baseUrl + _slug).then(function () {
		_this.waits(500);
		deferred.fulfill();
	});

	return deferred.promise;
};

Webpage.prototype.isClickableAnElement = function (_selector) {
	try {
		element(by.css(_selector)).click();
		return true;
	} catch (e) {
		return false;
	}
};

Webpage.prototype.getsTextExists = function (_text) {
	return element.all(by.xpath('//*[contains(text(),\'' + _text + '\')]')).count().then(function (arr) {
		return (arr > 0);
	}, function () {
		return false;
	});
};

Webpage.prototype.getsInputTextExists = function (_locator, _text) {
	return element.all(by.css(_locator)).filter(function (elem) {
		return elem.getAttribute('value');
	}).then(function (_val) {
		return _text.includes(_val);
	}).count().then(function (length) {
		return length > 0;
	});
};

Webpage.prototype.isDisplayed = function (e) {
	logger.log('Checking that the element ---> "' + e + '" is displayed');

	var first = element.all(by.css(e)).first(),
		last = element.all(by.css(e)).last(),
		firstVisibility = EC.visibilityOf(first),
		lastVisibility = EC.visibilityOf(last),
		AnyOfBothVisible = EC.or(firstVisibility, lastVisibility);

	return brw.wait(AnyOfBothVisible, 5000, err.elementNotFound(e)).then(function () {
		logger.log('The element: "' + e + '" was found');
		return true;
	}, function (err) {
		logger.log('The element: "' + e + '" was not found --->: ' + err);
		return false;
	});
};

Webpage.prototype.waitsFor = function (_class, idx) {
	logger.info('starting to waitsFor...', _class);

	return brw.wait(EC.visibilityOf(
		element.all(by.css(_class)).get(
			(typeof idx !== 'undefined') ? idx : 0
		)
	),
		(rootServer !== 'browserstack') ? 50000 : 50000
	, 'Error: the element "' + _class + '" was not found.');
};

Webpage.prototype.waitsForWidgets = function (_class) {
	brw.switchTo().frame(element.all(by.css('#iframe-icf')).getWebElement()).then(function () {

		return brw.wait(EC.visibilityOf(
			element.all(by.css(_class))
		),
			(rootServer !== 'browserstack') ? 30000 : 160000
		, 'Error: the element "' + _class + '" was not found.');
	});
};

Webpage.prototype.waitsForElement = function (_el) {
	var isDisplayed = EC.visibilityOf(_el);
	return brw.wait(isDisplayed,
		(rootServer !== 'browserstack') ? 10000 : 30000
	);
};

Webpage.prototype.waitsForPresence = function (_el) {
	return brw.wait(
		EC.presenceOf(
			element.all(by.css(_el)).get(0)
		)
	, 10000);
};

Webpage.prototype.waitsElementPresence = function (_el) {
	return brw.wait(
		EC.presenceOf(_el)
	, 10000);
};

Webpage.prototype.waitsForClickeable = function (_el) {
	return brw.wait(
		EC.elementToBeClickable(
			element.all(by.css(_el)).get(0)
		)
	, 10000);
};

Webpage.prototype.goBack = function () {
	return brw.navigate().back();
};

Webpage.prototype.closesOtherWindows = function () {
	return brw.getAllWindowHandles().then(function (handles) {
		logger.log('handles', handles);

		if (handles.length > 1) {
			async.times(handles.length - 1, function (n, next) {
				brw.switchTo().window(handles[n - 1]).then(function () {
					brw.close(); //close the current brw
					next();
				});
			});
		}
	});
};

Webpage.prototype.changeWindow = function (index) {
	return brw.getAllWindowHandles().then(function (handles) {
		logger.log('handles', handles);
		return brw.switchTo().window(handles[index]);
	});
};

Webpage.prototype.isQuizOnMaker = function () {
	var defer = protractor.promise.defer();

	this.getsTextExists('Quiz').then(function (_val) {
		console.log('isQuizOnMaker', _val);
		defer.fulfill(_val);
	});

	return defer.promise;
};

module.exports = new Webpage();