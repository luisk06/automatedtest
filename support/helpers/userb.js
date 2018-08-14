'use strict';

var User = function () {
	this.settings = {};
};

User.prototype.setSetting = function (_key, _val) {
	this.settings[_key] = _val;
};

User.prototype.getSetting = function (_key) {
	return this.settings[_key];
};

User.prototype.finds = function (_el) {
	var element = $(_el),
		isClickable = EC.presenceOf(element);

	//wait for an element to become clickable
	brw.wait(isClickable, 5000).then(function () {
		logger.log('Element -->: ' + _el + ' was displayed');
	}, function () {
		logger.log('Element -->: ' + _el + ' was not displayed');
	});

	return element;
};

User.prototype.findsValue = function (_el){
	return this.finds(_el).getAttribute('value');
};

User.prototype.findsContainingText = function (_el, _val){
	return element(by.cssContainingText(_el, _val));
};

User.prototype.findsOn = function (ele) {
	var i = 0;

	return this.isDisplayed(ele).then(function (res) {
		if (res === true) {
			return element.all(by.css(ele)).each(function (item) {
				item.click().then(function () {
					logger.log('done the promise');
					i++;
				}, function () {
					logger.log('It was error');
					i++;
				});

				if (i >= 2) return item;
			});
		} else {
			logger.log('Element -->: ' + ele + ' was not displayed');

			var deferred = protractor.promise.defer();
			return deferred.reject('Element -->: ' + ele + ' was not displayed');
		}
	});
};

User.prototype.clicksOn = function (ele) {
	return this.findsOn(ele);
};

User.prototype.findsAll = function (_el) {
	return element.all(by.css(_el));
};

User.prototype.findsRepeater = function (_el) {
	return element(by.repeater(_el));
};

User.prototype.findsAllRepeater = function (_el) {
	return element.all(by.repeater(_el));
};

User.prototype.findsName = function (_el) {
	return element(by.name(_el));
};

User.prototype.findsModel = function (_el) {
	return element(by.model(_el));
};

User.prototype.findsAllModel = function (_el) {
	return element.all(by.model(_el));
};

User.prototype.findsClassName = function (_el) {
	return element(by.className(_el));
};

User.prototype.findsLinkText = function (_el) {
	return element(by.linkText(_el));
};

User.prototype.findsJs = function (_function) {
	return element(by.js(_function));
};

User.prototype.findsBinding = function (_el) {
	return element(by.binding(_el));
};

User.prototype.findsXpath = function (_el) {
	return element(by.xpath(_el));
};

User.prototype.findsText = function (_el) {
	return this.finds(_el).getAttribute('value');
};

User.prototype.getText = function (_el) {
	return this.finds(_el).getText();
};

User.prototype.waitsFor = function (_class, idx) {
	idx = (typeof idx !== 'undefined') ? idx : 0;
	var timeout = (rootServer !== 'browserstack') ? 50000 : 50000;
	var _el = element.all(by.css(_class)).get(idx);

	logger.info('starting to waitsFor...', _class);

	return brw.wait(EC.visibilityOf(_el), timeout, 'Error: the element "' + _class + '" was not found.');
};

User.prototype.waitsForWidgets = function (_class) {
	brw.switchTo().frame(this.findsAll('#iframe-icf').getWebElement()).then(function () {
		var timeout = (rootServer !== 'browserstack') ? 30000 : 160000;
		var _el = this.findsAll(_class);

		return brw.wait(EC.visibilityOf(_el), timeout, 'Error: the element "' + _class + '" was not found.');
	});
};

User.prototype.waitsForElement = function (_el) {
	var time = (rootServer !== 'browserstack') ? 10000 : 30000;
	var isDisplayed = EC.visibilityOf(_el);
	return brw.wait(isDisplayed, time);
};

User.prototype.waitForElement = function (_el) {
	var time = (rootServer !== 'browserstack') ? 20000 : 30000;

	var isDisplayed = EC.visibilityOf(_el);
	return brw.wait(isDisplayed, time);
};

User.prototype.waitsForPresence = function (_el) {
	var time = 10000;

	_el = element.all(by.css(_el)).get(0);

	var isPresent = EC.presenceOf(_el);
	return brw.wait(isPresent, time);
};

User.prototype.waitsElementPresence = function (_el) {
	var time = 10000;

	var isPresent = EC.presenceOf(_el);
	return brw.wait(isPresent, time);
};

User.prototype.waitsForClickeable = function (_el) {
	var time = 10000;

	_el = element.all(by.css(_el)).get(0);

	var isPresent = EC.elementToBeClickable(_el);
	return brw.wait(isPresent, time);
};

module.exports = new User();