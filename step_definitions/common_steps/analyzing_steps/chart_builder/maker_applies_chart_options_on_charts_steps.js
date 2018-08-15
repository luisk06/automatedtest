'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var trendLineGraphLocator = by.css('.spec-trendline-graph');
	var tooltip = by.css('.spec-multiseries-tooltip');
	var containerLocator = by.css('.spec-combo-panel-container:not(.ng-hide)');


	When(/^the user picks "([^"]*)" from "([^"]*)" dropdown$/, function (optionToPick, dropdownType, cb) {
		webpage.waits(1500);
		element(by.css('.spec-' + dropdownType + '-dropdown > div > span')).click().then(function () {
			webpage.waits(800);
			element(by.xpath("//qv-dropdown[contains(@class, 'spec-" + dropdownType + "-dropdown')]//div[contains(@class, 'options')]//span[contains(text(),'" + optionToPick + "')]")).click().then(cb); // eslint-disable-line
		});
	});

	When(/^the user picks "([^"]*)" from "([^"]*)" layer dropdown$/, function (optionToPick, dropdownType, cb) {
		webpage.waits(1500);
		var panelContainer = element.all(containerLocator).last();
		panelContainer.element(by.css('.spec-' + dropdownType + '-dropdown > div > span')).click().then(function () {
			panelContainer.element(by.xpath(".//qv-dropdown[contains(@class, 'spec-" + dropdownType + "-dropdown')]//div[contains(@class, 'options')]//span[contains(text(),'" + optionToPick + "')]")).click().then(cb); // eslint-disable-line
		});
	});

	Then(/^the y axis label number (\d+) on combo should be "([^"]*)"$/, function (number, text, cb) {
		webpage.waits(1500);
		element.all(by.css('.spec-y-axis-label-combo')).get(number-1).getText().then(function(_text){
			expect(_text).to.be.equal(text);
		}).then(cb);
	});

	When(/^the user clicks on chart options tab$/, function (cb) {
		webpage.waits(2000);
		element(by.css('.spec-chart-options-tab')).click().then(cb);
	});

	When(/^the user opens the first combo panel$/, function (cb) {
		element(containerLocator).click().then(cb);
	});

	When(/^the user opens the combo panel number (\d+)$/, function (number, cb) {
		element.all(containerLocator).get(number - 1).click().then(cb);
	});

	When(/^the user choose "([^"]*)" as visualization mode$/, function (visual, cb) {
		element(by.css('.spec-multi-'+visual)).click().then(cb);
	});

	When(/^the user adds a new layer$/, function (cb) {
		element(by.css('.spec-chart-add-combochart-layer')).click().then(cb);
	});

	Then(/^the number of "([^"]*)" groups should be (\d+)$/, function (chartType, number, cb) {
		element.all(by.css('.spec-'+chartType+'-value')).count().then(function(_number){
			expect(_number).to.be.equal(parseInt(number));
		}).then(cb);

	});

	Then(/^a trend line should be displayed$/, function (cb) {
		element(trendLineGraphLocator).isDisplayed().then(function(_isdisplayed){
			expect(_isdisplayed).to.be.true;
		}).then(cb);
	});

	Then(/^the trend line must have a tooltip in each dot$/, function (cb) {
		element(trendLineGraphLocator).all(by.tagName('circle')).each(function(_circle){
			brw.actions().mouseMove(_circle).perform().then(function () {
				// console.log('index', index);
				webpage.waits(1000);
				expect(element(by.css('.spec-trend-tooltip')).isDisplayed()).to.be.eventually.true;
			});
		}).then(cb);
	});


	Then(/^a multi series tooltip should appear on each line dot$/, function (cb) {
		var circleLocator = by.css('.spec-line-value circle');
		element.all(circleLocator).each(function(_circle){
			brw.actions().mouseMove(_circle).perform().then(function () {
				// console.log('index', index);
				webpage.waits(1000);
				expect(element(tooltip).isDisplayed()).to.be.eventually.true;
				expect(element(tooltip).getText()).to.not.eventually.include('NaN');
			});
		}).then(cb);
	});

	Then(/^a multi series tooltip should appear on each symbol point$/, function (cb) {
		var symbolLocator = by.css('.spec-symbol-value path');
		element.all(symbolLocator).each(function(_circle){
			brw.actions().mouseMove(_circle).mouseMove({
				x: 7,
				y: 0
			}).perform().then(function () {
				// console.log('index', index);
				webpage.waits(1000);
				expect(element(tooltip).isDisplayed()).to.be.eventually.true;
				expect(element(tooltip).getText()).to.not.eventually.include('NaN');
			});
		}).then(cb);
	});

	Then(/^a multi series tooltip should appear on each bar$/, function (cb) {
		var barLocator = by.css(".spec-bar-value rect:not([fill*='rgba'])"); // eslint-disable-line
		element.all(barLocator).each(function(_circle){
			brw.actions().mouseMove(_circle).perform().then(function () {
				// console.log('index', index);
				webpage.waits(1000);
				expect(element(tooltip).isDisplayed()).to.be.eventually.true;
				element(tooltip).getText().then(function(_text){
					// console.log('texto: ', _text);
					expect(_text).to.not.include('NaN');
				});

			});
		}).then(cb);
	});

	Then(/^the bars should be displayed as "([^"]*)"$/, function (visual, cb) {
		var barsLocator = by.css('.spec-bar-value');
		element.all(barsLocator).each(function(_circle){
			webpage.waits(1000);
			expect(hasClass(_circle, 'spec-bar-'+visual)).to.be.eventually.true;
		}).then(cb);
	});

	When(/^the user moves to "([^"]*)" filter tab$/, function (tab, cb) {
		element(by.xpath("//li[text() = '"+tab+"']")).click().then(cb); // eslint-disable-line
	});

};