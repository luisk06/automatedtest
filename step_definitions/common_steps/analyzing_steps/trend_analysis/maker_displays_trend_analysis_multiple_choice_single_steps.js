'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var filtersValues;
	var trendValues;
	var _totalAnswers;
	var sum;
	var arr;

	When(/^user turn histogram "([^"]*)"$/, function (switchMode, cb) {
		var _mode = (switchMode == 'active') ? 'disbaled' : switchMode;
		var _class = by.css('.spec-histogram-' + _mode);
		element(_class).click().then(cb);
	});

	When(/^user turn "([^"]*)" the "([^"]*)" on "([^"]*)"$/, function (switchMode, toggleSeriesItem, typeOfQrvey, cb) {
		user.waits(2500);
		brw.executeScript('window.scrollTo(0,0);').then(function () {
			var _class = by.css('.spec-timeseries-switch');
			var number = (toggleSeriesItem == 'time_series') ? 0 : 1;
			element.all(_class).get(number).click().then(cb);
		});
	});

	When(/^the user clicks on the "([^"]*)" number (\d+) on "([^"]*)"$/, function (btn, i, typeOfQrvey, cb) {
		logger.log('btn', btn);
		logger.log('i', i);
		var index = i - 1;
		logger.log(index);
		user.waits(2000).then(function () {
			var _element = user.findsAll('.spec-' + btn + '-' + i).get(index);
			_element.click().then(cb);
		});
	});

	When(/^user store "([^"]*)" filters values$/, function (typeOfQestion, cb) {
		var key;
		var value;
		var repeater = by.css('.spec-filter-container');
		filtersValues = {};

		switch (typeOfQestion) {
			case 'multiple_choice':
			case 'image':
			case 'yes-no':
				user.waitForElement(element(repeater));
				element.all(repeater).then(function (els) {
					els.forEach(function (ele, i, a) {
						a[i].element(by.css('p')).getText().then(function (_key) {
							key = _key;
						}).then(function () {
							a[i].element(by.css('text')).getText().then(function (_value) {
								value = _value;
							}).then(function () {
								filtersValues[key] = value;
							});
						});
					});
				}).then(cb);
				break;
			case 'expression':
			case 'multiple_choice_multiple_selection':
				user.waitForElement(element(repeater));
				sum = 0;
				arr = [];
				element.all(repeater).each(function (filter) {
					filter.element(by.css('text')).getText().then(function (_value) {
						value = _value.trim().split(')');
						var aux = value[0].substring(1, value[0].length);
						// console.log('AUX: ', aux);
						arr.push(aux);
						sum += parseInt(aux);
						// console.log('SUM: ', sum);

					});
				}).then(cb);
				break;
			case 'date':
				repeater = by.css('.spec-bucket-answer');
				element.all(repeater).then(function (els) {
					els.forEach(function (ele, i, a) {
						a[i].element(by.css('p')).getText().then(function (_key) {
							key = _key;
						}).then(function () {
							a[i].element(by.css('text')).getText().then(function (_value) {
								value = _value;
							}).then(function () {
								filtersValues[key] = value;
							});
						});
					});
				}).then(cb);
				break;
			case 'short-text':
			case 'long-text':
				repeater = by.css('.spec-sentiment-container');
				element.all(repeater).then(function (els) {
					els.forEach(function (ele, i, a) {
						a[i].element(by.css('.spec-sentiment-number')).getText().then(function (number) {
							if (number !== '0') {
								a[i].element(by.css('.spec-sentiment-title')).getText().then(function (_key) {
									key = _key;
								}).then(function () {
									a[i].element(by.css('.spec-sentiment-percentage')).getText().then(function (_value) {
										value = _value;
									}).then(function () {
										logger.log('key:', key.trim());
										logger.log('value:', value.trim());
										filtersValues[key] = value;
									});
								});
							}
						});
					});
				}).then(cb);
				break;
			case 'ranking':
				repeater = by.css('.spec-option-row');
				element.all(repeater).then(function (els) {
					els.forEach(function (ele, i, a) {
						a[i].element(by.css('.spec-option-name')).getText().then(function (_key) {
							key = _key.trim();
						}).then(function () {
							a[i].element(by.css('.spec-option-average')).getText().then(function (_value) {
								value = _value.trim();
							}).then(function () {
								logger.log('key:', key);
								logger.log('value:', value);
								filtersValues[key] = value;
							});
						});
					});
				}).then(cb);
				break;
		}
	});

	When(/^user store "([^"]*)" trend values$/, function (typeOfQestion, cb) {
		trendValues = {};
		var repeater = null;
		switch (typeOfQestion) {
			case 'multiple_choice':
			case 'image':
			case 'yes-no':
			case 'date':
				user.waits(1100);
				repeater = by.css('.spec-trend-bar');
				element.all(repeater).then(function (els) {
					els.forEach(function (ele, i, a) {
						brw.actions().mouseMove(a[i]).perform().then(function () {
							user.waits(500);
							element(by.css('.spec-trend-tooltip-down')).getText().then(function (_text) {
								if (_text !== '') {
									logger.log(_text);
									var text = _text.split(':');
									var aux = text[1].trim().split(' ');
									var value = aux[1] + ' ' + aux[0];
									logger.log('value ' + value);
									trendValues[text[0].trim()] = value;
								}
							});
						});
					});
				}).then(cb);
				break;
			case 'short-text':
			case 'long-text':
				user.waits(1100);
				repeater = by.css('.spec-trend-bar');
				var _element = element(by.css('.spec-trend-tooltip-down span'));
				element.all(repeater).each(function (bar) {
					brw.actions().mouseMove(bar).perform().then(function () {
						webpage.waitsForElement(_element);
						user.waits(500);
						// browser.explore();
						_element.getText().then(function (_text) {
							if (_text !== '') {
								var text = _text.split(':');
								logger.log(_text);
								var key = text[0].trim();
								var value = text[1].trim();
								if (!value.includes('.')) {
									var aux = value.split('%');
									value = aux[0] + '.0%';
								}
								trendValues[key] = value;
							}
						});
					});

				}).then(cb);
				break;
			case 'ranking':
				user.waits(1100);
				repeater = by.css('.spec-trend-bar');
				element.all(repeater).then(function (els) {
					els.forEach(function (ele, i, a) {
						brw.actions().mouseMove(a[i]).perform().then(function () {
							user.waits(500);
							element(by.css('.spec-trend-tooltip-down')).getText().then(function (_text) {
								if (_text !== '') {
									logger.log(_text);
									var text = _text.split(':');
									var aux = text[1].trim().split('(');
									var value = aux[1].substring(0, aux[1].length - 1);
									logger.log('value ' + value);
									trendValues[text[0].trim()] = value;
								}
							});
						});
					});
				}).then(cb);
				break;
		}
	});

	When(/^user store total of answers$/, function (cb) {
		qrvey.openAnalytiqFilterBar().then(function(){
			element(by.css('.spec-analyzing-answered')).getText().then(function (res) {
				_totalAnswers = res;
			}).then(cb);
		});
	});

	When(/^user gets total of answers$/, function (cb) {
		element(by.css('.spec-analyzing-answered')).getText().then(function (res) {
			_totalAnswers = res;
		}).then(cb);
	});


	Then(/^the trend analysis icon number (\d+) should be "([^"]*)" on "([^"]*)"$/, function (iconNumber, state, typeOfQrvey, cb) {
		var _class = by.css('.spec-trend-analysis-' + state + '-' + iconNumber);

		element(_class).isDisplayed().then(function (_isDisplayed) {
			expect(_isDisplayed).to.be.true;
		}).then(cb);
	});

	Then(/^the total of answers should match total on every "([^"]*)" tooltip$/, function (typeOfQestion, cb) {
		var repeater;
		var valueCompare;

		switch (typeOfQestion) {
			case 'multiple_choice':
			case 'image':
			case 'yes-no':
			case 'date':
			case 'numeric':
			case 'short-text':
			case 'long-text':
				repeater = by.css('.spec-trend-bar');
				valueCompare = parseInt(_totalAnswers);
				break;
			case 'expression':
			case 'multiple_choice_multiple_selection':
				repeater = by.css('.spec-trend-bar');
				valueCompare = sum;
				break;
			case 'slidebar':
			case 'rating':
				repeater = by.css('.spec-trend-dot');
				valueCompare = parseInt(_totalAnswers);
				break;
		}
		user.waits(1100);
		element.all(repeater).then(function (els) {
			expect(els.length, 'No items to loop').to.be.above(0);
			els.forEach(function (ele, i, a) {
				brw.actions().mouseMove(a[i]).perform().then(function () {
					user.waits(500);
					element(by.css('.spec-trend-tooltip-up')).getText().then(function (_text) {
						if (_text !== '') {
							var text = _text.trim().split('(');
							var value = text[1].substring(0, text[1].length - 1);
							expect(valueCompare).to.be.equal(parseInt(value));
						}
					});
				});
			});
		}).then(cb);
	});

	Then(/^the total of trend bars should be total of "([^"]*)" options$/, function (typeOfQestion, cb) {
		var ele = element.all(by.css('.spec-trend-option'));
		switch (typeOfQestion) {
			case 'multiple_choice':
			case 'image':
			case 'yes-no':
			case 'ranking':
				expect(ele.count()).to.eventually.be.equal(Object.keys(filtersValues).length).and.notify(cb);
				break;
			case 'expression':
			case 'multiple_choice_multiple_selection':
				expect(ele.count()).to.eventually.be.equal(arr.length).and.notify(cb);
				break;
			case 'date':
				expect(ele.count()).to.eventually.be.equal(Object.keys(filtersValues).length + 1).and.notify(cb);
				break;
			case 'numeric':
				element.all(by.css('.spec-trend-bar')).count().then(function (totalBars) {
					expect(ele.count()).to.eventually.be.equal(totalBars).and.notify(cb);
				});
				break;
			case 'short-text':
			case 'long-text':
				element.all(by.css('.spec-sentiment-container')).count().then(function (totalBars) {
					expect(ele.count()).to.eventually.be.equal(totalBars+1).and.notify(cb);
				});
				break;
		}
	});

	Then(/^the trend values and filters values must be same$/, function (cb) {
		logger.log(filtersValues);
		logger.log(trendValues);
		expect(unders.isEqual(filtersValues, trendValues)).to.be.true;
		cb();
	});

};
