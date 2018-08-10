'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var barsLocator = by.css(".spec-bar-value rect:not([fill*='rgba'])"); // eslint-disable-line
	var linesLocator = by.css('.spec-line-value circle');
	var symbolsLocator = by.css('.spec_symbol_point');
	var portionsLocator = by.css('.spec-piechart-graph .fan');
	var wordsLocator = by.css('text.spec-wordcloud-word');
	var clickedPortionText = '';

	When(/^the user clicks "([^"]*)" on drill down list$/, function (optionToPick, cb) {
		user.waits(700);
		element(by.xpath("//ul[contains(@class, 'spec-drill-down-list')]/li[text() = '" + optionToPick + "']")).click().then(cb);// eslint-disable-line
	});

	Then(/^the see data option should not appear$/, function (cb) {
		user.waits(700);
		var seeDataBtn = element(by.xpath("//ul[contains(@class, 'spec-drill-down-list')]/li[text() = 'See Data']"));// eslint-disable-line
		expect(seeDataBtn.isPresent(), 'See data button should not be displayed').to.be.eventually.false.and.notify(cb);
	});

	When(/^the user clicks on the bar (\d+)$/, function (index, cb) {
		user.waits(1500);
		var bar = element.all(barsLocator).get(index - 1);
		bar.click().then(cb);
	});

	When(/^the user clicks on the dot (\d+)$/, function (index, cb) {
		user.waits(1500);
		var line = element.all(linesLocator).get(index - 1);
		line.click().then(cb);
	});

	When(/^the user clicks on the word (\d+)$/, function (index, cb) {
		user.waits(1500);
		var word = element.all(wordsLocator).get(index - 1);
		word.click().then(function(){
			word.getText().then(function(_res){
				clickedPortionText = _res;
			});
		}).then(cb);
	});

	When(/^the user clicks on the symbol (\d+)$/, function (index, cb) {
		// browser.explore();
		user.waits(1400);
		brw.actions().mouseMove(element.all(symbolsLocator).get(index - 1)).mouseMove({
			x: 7,
			y: 0
		}).click().perform().then(function(){
			user.waits(1000);
			// console.log('click');
		}).then(cb);
	});

	When(/^the user clicks on the portion "([^"]*)"$/, function (option, cb) {
		var portion = element(by.xpath("//*[name() = 'text' and text() = '"+option+"']/parent::*[name() = 'g' and contains(@class, 'fan')]"));// eslint-disable-line
		portion.click().then(function(){
			portion.element(by.tagName('text')).getText().then(function(res){
				clickedPortionText = res;
			});
		}).then(cb);
	});

	When(/^the user clicks on the cell (\d+) for "([^"]*)" row$/, function (number, option, cb) {
		var cell = element.all(by.xpath("//th[@class = 'spec-heatmap-label' and text()= '"+option+"']/following-sibling::td[contains(@class, 'spec-heatmap-cell')]")).get(number-1);// eslint-disable-line
		cell.click().then(cb);
	});

	Then(/^the numbers of bars should be (\d+)$/, function (number, cb) {
		element.all(barsLocator).count().then(function(count){
			expect(count).to.be.equal(parseInt(number));
		}).then(cb);
	});

	Then(/^the numbers of dots should be (\d+)$/, function (number, cb) {
		element.all(linesLocator).count().then(function(count){
			expect(count).to.be.equal(parseInt(number));
		}).then(cb);
	});

	Then(/^the numbers of symbols should be (\d+)$/, function (number, cb) {
		element.all(symbolsLocator).count().then(function(count){
			expect(count).to.be.equal(parseInt(number));
		}).then(cb);
	});

	Then(/^the numbers of portions should be (\d+)$/, function (number, cb) {
		element.all(portionsLocator).count().then(function(count){
			expect(count).to.be.equal(parseInt(number));
		}).then(cb);
	});

	Then(/^the "([^"]*)" axis label with drilldown should have "([^"]*)"$/, function (axis, text, cb) {
		user.waits(1200);
		element(by.css('.spec-'+axis+'-axis-label')).getText().then(function(_text){
			expect(_text).to.be.equal('Multiple Choice > ' + clickedPortionText + ' ' + text);
		}).then(cb);
	});

	Then(/^"([^"]*)" answer should be contained in histogram filters$/, function (answerText, cb) {
		element(by.css('.spec-analize-filters-list')).getText().then(function(res) {
			expect(res).to.contain(answerText);
		}).then(cb);
	});

	Then(/^the clicked "([^"]*)" should be contained in histogram filters$/, function (object, cb) {
		element(by.css('.spec-analize-filters-list')).getText().then(function(res) {
			expect(res, 'the ' +object + 'clicked is not applying the filter').to.contain(clickedPortionText);
		}).then(cb);
	});

	Then(/^the user should be on tabular view$/, function (cb) {
		element(by.css('.header-filter span.spec-filter-analyze')).getText().then(function(res) {
			expect(res).to.be.equal('Tabular View');
		}).then(function(){
			element(by.tagName('an-tabular-view')).isDisplayed().then(function(_is){
				expect(_is).to.be.true;
			});
		}).then(cb);
	});

	Then(/^the number of filters applied should be (\d+)$/, function (filters, cb) {
		element.all(by.css('.spec-analize-filters-list li')).count().then(function(res) {
			expect(res).to.be.equal(parseInt(filters));
		}).then(cb);
	});

	Then(/^the number of tabular rows should be more than (\d+)$/, function (rows, cb) {
		element.all(by.css('.dx-data-row')).count().then(function(res) {
			expect(res).to.be.above(rows);
		}).then(cb);
	});

	Then(/^the number of tabular rows should be less than (\d+)$/, function (rows, cb) {
		element.all(by.css('.dx-data-row')).count().then(function(res) {
			expect(res).to.be.below(rows);
		}).then(cb);
	});
};