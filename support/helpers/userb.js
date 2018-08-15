'use strict';

var Userb = function () { };

Userb.prototype.setSetting = function (_key, _val) {
	this.settings[_key] = _val;
};

Userb.prototype.getSetting = function (_key) {
	return this.settings[_key];
};

Userb.prototype.finds = function (_el) {
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

Userb.prototype.count = function (_el) {
	return this.findsAll(_el).count();
};

Userb.prototype.findsValue = function (_el) {
	return this.finds(_el).getAttribute('value');
};

Userb.prototype.findsContainingText = function (_el, _val) {
	return element(by.cssContainingText(_el, _val));
};

// Userb.prototype.findsOn = function (ele) {
// 	var i = 0;

// 	return this.isDisplayed(ele).then(function (res) {
// 		if (res === true) {
// 			return element.all(by.css(ele)).each(function (item) {
// 				item.click().then(function () {
// 					logger.log('done the promise');
// 					i++;
// 				}, function () {
// 					logger.log('It was error');
// 					i++;
// 				});

// 				if (i >= 2) return item;
// 			});
// 		} else {
// 			logger.log('Element -->: ' + ele + ' was not displayed');

// 			var deferred = protractor.promise.defer();
// 			return deferred.reject('Element -->: ' + ele + ' was not displayed');
// 		}
// 	});
// };

Userb.prototype.clicksOn = function (ele) {
	return this.finds(ele).click();
};

Userb.prototype.findsAll = function (_el) {
	return element.all(by.css(_el));
};

Userb.prototype.findsRepeater = function (_el) {
	return element(by.repeater(_el));
};

Userb.prototype.findsAllRepeater = function (_el) {
	return element.all(by.repeater(_el));
};

Userb.prototype.findsName = function (_el) {
	return element(by.name(_el));
};

Userb.prototype.findsModel = function (_el) {
	return element(by.model(_el));
};

Userb.prototype.findsAllModel = function (_el) {
	return element.all(by.model(_el));
};

Userb.prototype.findsClassName = function (_el) {
	return element(by.className(_el));
};

Userb.prototype.findsLinkText = function (_el) {
	return element(by.linkText(_el));
};

Userb.prototype.findsJs = function (_function) {
	return element(by.js(_function));
};

Userb.prototype.findsBinding = function (_el) {
	return element(by.binding(_el));
};

Userb.prototype.findsXpath = function (_el) {
	return element(by.xpath(_el));
};

Userb.prototype.findsText = function (_el) {
	return this.finds(_el).getAttribute('value');
};

Userb.prototype.getText = function (_el) {
	return this.finds(_el).getText();
};

Userb.prototype.waitsFor = function (_class, idx) {
	idx = (typeof idx !== 'undefined') ? idx : 0;
	var timeout = (rootServer !== 'browserstack') ? 50000 : 50000;
	var _el = element.all(by.css(_class)).get(idx);

	logger.info('starting to waitsFor...', _class);

	return brw.wait(EC.visibilityOf(_el), timeout, 'Error: the element "' + _class + '" was not found.');
};

Userb.prototype.waitsForWidgets = function (_class) {
	brw.switchTo().frame(this.findsAll('#iframe-icf').getWebElement()).then(function () {
		var timeout = (rootServer !== 'browserstack') ? 30000 : 160000;
		var _el = this.findsAll(_class);

		return brw.wait(EC.visibilityOf(_el), timeout, 'Error: the element "' + _class + '" was not found.');
	});
};

Userb.prototype.waitsForElement = function (_el) {
	var time = (rootServer !== 'browserstack') ? 10000 : 30000;
	var isDisplayed = EC.visibilityOf(_el);
	return brw.wait(isDisplayed, time);
};

Userb.prototype.waitForElement = function (_el) {
	var time = (rootServer !== 'browserstack') ? 20000 : 30000;

	var isDisplayed = EC.visibilityOf(_el);
	return brw.wait(isDisplayed, time);
};

Userb.prototype.waitsForPresence = function (_el) {
	var time = 10000;

	_el = element.all(by.css(_el)).get(0);

	var isPresent = EC.presenceOf(_el);
	return brw.wait(isPresent, time);
};

Userb.prototype.waitsElementPresence = function (_el) {
	var time = 10000;

	var isPresent = EC.presenceOf(_el);
	return brw.wait(isPresent, time);
};

Userb.prototype.waitsForClickeable = function (_el) {
	var time = 10000;

	_el = element.all(by.css(_el)).get(0);

	var isPresent = EC.elementToBeClickable(_el);
	return brw.wait(isPresent, time);
};

module.exports = Userb;