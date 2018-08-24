'use strict';

var Base = function () { };

Base.prototype.setSetting = function (_key, _val) {
	this.settings[_key] = _val;
};

Base.prototype.getSetting = function (_key) {
	return this.settings[_key];
};

Base.prototype.finds = function (_el) {
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

Base.prototype.count = function (_el) {
	return this.findsAll(_el).count();
};

Base.prototype.findsValue = function (_el) {
	return this.finds(_el).getAttribute('value');
};

Base.prototype.findsContainingText = function (_el, _val) {
	return element(by.cssContainingText(_el, _val));
};

// Base.prototype.findsOn = function (ele) {
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

Base.prototype.clicksOn = function (ele) {
	return this.finds(ele).click();
};

Base.prototype.findsAll = function (_el) {
	return element.all(by.css(_el));
};

Base.prototype.findsRepeater = function (_el) {
	return element(by.repeater(_el));
};

Base.prototype.findsAllRepeater = function (_el) {
	return element.all(by.repeater(_el));
};

Base.prototype.findsName = function (_el) {
	return element(by.name(_el));
};

Base.prototype.findsModel = function (_el) {
	return element(by.model(_el));
};

Base.prototype.findsAllModel = function (_el) {
	return element.all(by.model(_el));
};

Base.prototype.findsClassName = function (_el) {
	return element(by.className(_el));
};

Base.prototype.findsLinkText = function (_el) {
	return element(by.linkText(_el));
};

Base.prototype.findsJs = function (_function) {
	return element(by.js(_function));
};

Base.prototype.findsBinding = function (_el) {
	return element(by.binding(_el));
};

Base.prototype.findsXpath = function (_el) {
	return element(by.xpath(_el));
};

Base.prototype.findsText = function (_el) {
	return this.finds(_el).getAttribute('value');
};

Base.prototype.getText = function (_el) {
	return this.finds(_el).getText();
};

module.exports = Base;