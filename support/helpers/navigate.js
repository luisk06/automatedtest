'use strict';

var Navigate = function() {
	this.goToUrl = function(url) {
		return brw.get(url);
	};

	this.getCurrentUrl = function() {
		return brw.getCurrentUrl();
	};

	this.goTo = function(path, cb) {
		brw.manage().deleteAllCookies();
		brw.get(brw.baseUrl + path).then(cb);
	};

	this.clicksHidden = function(ele) {
		var button = $(ele);
		var isPresent = EC.presenceOf(button);
		brw.wait(isPresent, 7000, ele + err.notPresent);
		return button.click();
	};

	this.waitForElement = function(ele) {
		var button = $(ele);
		var isVisible = EC.visibilityOf(button);
		return brw.wait(isVisible, 7000, ele + err.notVisible);
	};

	this.waitForWebElement = function(webElement) {
		logger.log('Looking for webElement ---> "' + webElement + '"');
		var isPresent = EC.visibilityOf(webElement);
		return brw.wait(isPresent, 7000, webElement + err.notPresent);
	};

	this.navTo = function(path) {
		brw.get(brw.baseUrl + path);
	};

	this.goToProfile = function() {
		var button = $('.spec-dropdown-menu-main');
		var isClickable = EC.elementToBeClickable(button);
		brw.wait(isClickable, 5000, '.spec-dropdown-menu-main' + err.notClickable); //wait for an element to become clickable
		button.click();
		element(by.css('[ng-click="goToProfile()"]')).click();
	};

	this.clicksButton = function(ele) {
		return this.isDisplayed(ele).then(function(res) {
			if (res == true) {
				return element.all(by.css(ele)).each(function(item) {
					item.click().then(function() {
						logger.log('click()');
					}, function() {
						logger.log('fails click');
					});
					// if (i >= 2) {}
				});
			} else {
				var deferred = protractor.promise.defer();
				return deferred.reject('Element -->: ' + ele + ' was not displayed');
			}
		});
		/*logger.log('Looking for ---> ' + ele);
        var button = $(ele);
        var isClickable = EC.elementToBeClickable(button);
        brw.wait(isClickable, 5000, ele + err.notClickable); //wait for an element to become clickable
        */
		// var i = 0;
		// return element.all(by.css(ele)).each(function(item) {
		// 	item.click().then(function() {
		// 		logger.log('click()');
		// 		i++;
		// 	}, function(err) {
		// 		i++;
		// 	});
		// 	if (i >= 20) {
		// 		var deferred = protractor.promise.defer();
		// 		return deferred.fulfill();
		// 	}
		// });
	};

	this.sendKeys = function(e, keys) {
		var ele = $(e);
		var isClickable = EC.elementToBeClickable(ele);
		brw.wait(isClickable, 5000, e + err.notClickable); //wait for an element to become clickable
		return ele.sendKeys(keys);
	};

	this.clearField = function(e) {
		logger.log('Looking for ---> ' + e + ' to clear it');
		var ele = $(e);
		var isClickable = EC.elementToBeClickable(ele);
		brw.wait(isClickable, 5000, e + err.notClickable); //wait for an element to become clickable
		return ele.clear();
	};

	this.ignoreSync = function(value) {
		brw.ignoreSynchronization = value;
	};

	this.isVisible = function(e) {
		var ele = $(e);
		var isVisible = EC.visibilityOf(ele);
		brw.wait(isVisible, 5000, e + err.notVisible).then(function() {
			logger.log('dqsdqsd: ', isVisible);
			return isVisible;
		});
	};

	this.textPresence = function(text) {
		logger.log('Checking that the text ---> "' + text + '" is present');
		return element.all(by.xpath('//*[contains(text(),\'' + text + '\')]')).then(function(arr) {
			if (arr.length === 0) {
				logger.log('The text ---> "' + text + '" was not found');
							// brw.pause();
				return false;
			} else {
				logger.log('The text ---> "' + text + '" was found');
				return true;
			}
		}, function() {
			// logger.log(obj+ " -- not found: " + err );
			throw 'element not found';
		});
	};

	this.isPresent = function(webElement) {
		this.waitForWebElement(webElement);
		return webElement.isPresent();
	};

	this.selectWindow = function(index) {
        // wait for handles[index] to exist
		brw.wait(function() {
			return brw.getAllWindowHandles().then(function(handles) {
				if (handles.length > index) {
					return true;
				}
			});
		}, 30000);
		return brw.getAllWindowHandles().then(function(handles) {
			return brw.switchTo().window(handles[index]);
		});
	};

	this.clicks = function(button) {
		element(by.id(button)).click();
	};

	this.pressButton = function(button) {
		brw.findElement(by.css(button)).click();
	};

	this.outsideClick = function() {
		element(by.css('body')).click();
	};

	this.clickTab = function(tab) {
		switch (tab) {
			case 'comments':
				element(by.xpath('//ul[@class=\'nav nav-tabs\']/li[1]')).click();
				break;
			case 'subscriptions':
				element(by.xpath('//ul[@class=\'nav nav-tabs\']/li[2]')).click();
				break;
			case 'events':
				element(by.xpath('//ul[@class=\'nav nav-tabs\']/li[3]')).click();
				break;
		}
	};

	this.isDisplayed = function(e) {
		logger.log('Checking that the element ---> "' + e + '" is displayed');
		var first = element.all(by.css(e)).first();
		var last = element.all(by.css(e)).last();
		var firstVisibility = EC.visibilityOf(first);
		var lastVisibility = EC.visibilityOf(last);
		var AnyOfBothVisible = EC.or(firstVisibility, lastVisibility);
		return brw.wait(AnyOfBothVisible, 5000, err.elementNotFound(e)).then(function() {
			logger.log('im here 1');
			logger.log('The element: "' + e + '" was found');
			return true;
		}, function(err) {
			logger.log('im here 2');
			logger.log('The element: "' + e + '" was not found --->: ' + err);
			return false;
		});
	};

	this.compareAbsUrlWith = function(url) {
		return brw.getLocationAbsUrl().then(function(absUrl) {
			logger.log('Comparing ---> /'.concat(url).concat(' with current absUrl ').concat(absUrl));
			return (('/' + url) === absUrl);
		});
	};

	this.asyncLoop = function(iterations, func, callback) {
		var index = 0;
		var done = false;
		var loop = {
			next: function() {
				if (done) {
					return;
				}

				if (index < iterations) {
					index++;
					func(loop);
				} else {
					done = true;
					callback();
				}
			},

			iteration: function() {
				return index - 1;
			},

			break: function() {
				done = true;
				callback();
			}
		};
		loop.next();
		return loop;
	};

	this.textPresence = function(text) {
		return element.all(by.xpath('//*[contains(text(),\'' + text + '\')]')).then(function(arr) {
			if (arr.length === 0) {
				return false;
			} else return true;
		}, function() {
			throw 'element not found';
		});
	};
};

module.exports = new Navigate();
