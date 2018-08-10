'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has webform app with a "([^"]*)" with "([^"]*)" chart builder compatible questions with (\d+) responses$/, function (typeOfQrvey, chartType, num, cb) {
		us.isLogged().then(function (_userId) {
			apps.createNewApp('Test Chart Builder').then(function () {
				switch (chartType) {
					case 'bar':
						as.createAnswersForBarChartBuilder(_userId, typeOfQrvey, num).then(function (data) {
							logger.log('qrveys.data', data);
							user.waits(5000);
						}).then(cb);
						break;
					case 'word-cloud':
						as.createAnswersForWordCloudChartBuilder(_userId, typeOfQrvey, num).then(function (data) {
							logger.log('qrveys.data', data);
							user.waits(5000);
						}).then(cb);
						break;
					case 'line':
						as.createAnswersForLineChartBuilder(_userId, typeOfQrvey, num).then(function (data) {
							logger.log('qrveys.data', data);
							user.waits(5000);
						}).then(cb);
						break;
					case 'symbol':
						as.createAnswersForSymbolChartBuilder(_userId, typeOfQrvey, num).then(function (data) {
							logger.log('qrveys.data', data);
							user.waits(5000);
						}).then(cb);
						break;
				}

			});
		});
	});

	When(/^the user clicks on add chart$/, function (cb) {
		scrollAxisY('500');
		element(by.css('.spec_add_chart_button')).click().then(cb);
	});

	When(/^the user selects "([^"]*)" chart$/, function (chartType, cb) {
		element(by.css('.spec_chart_' + chartType)).click().then(function () {
			element(by.css('.spec_apply_chart_next_button')).click().then(cb);
		});
	});

	When(/^the user enter "([^"]*)" as bar chart name$/, function (chartName, cb) {
		element(by.css('.spec_bar_chart_name_input')).sendKeys(chartName).then(cb);
	});

	When(/^the user selects "([^"]*)" from "([^"]*)" dropdown$/, function (questionType, dropdownType, cb) {
		element(by.css('qv-dropdown.spec_bar_' + dropdownType + '_dropdown > div > span')).click().then(function () {
			user.waits(2000);
			var option = element(by.xpath("//qv-dropdown[contains(@class, 'spec_bar_" + dropdownType + "_dropdown')]//div[contains(@class, 'options')]//span[normalize-space(text()) = '" + questionType + "']"));// eslint-disable-line
			scrollIntoElement(option).then(function(){
				option.click().then(cb);
			});
		});
	});

	When(/^the user clicks on save chart button$/, function (cb) {
		user.waits(2000);
		element(by.css('.spec_save_chart_button')).click().then(function(){
			user.waits(2000);
		}).then(cb);
	});

	Then(/^a custom panel should be displayed with "([^"]*)" as title$/, function (chartTitle, cb) {
		user.waits(1300);

		var chart = element(by.css('.spec-panel-custom-chart'));

		chart.isDisplayed().then(function (_isDisplayed) {
			expect(_isDisplayed).to.be.true;
		}).then(function () {
			expect(chart.element(by.css('.spec-custom-chart-name')).getText()).to.eventually.be.equal(chartTitle).and.notify(cb);
		});
	});

	Then(/^the bars should not be "([^"]*)"$/, function (barValue, cb) {
		var bars = element(by.css('.spec-bar-value'));
		bars.all(by.css('rect')).each(function (bar) {
			expect(bar.getAttribute('height')).to.eventually.not.be.equal(barValue).and.notify(cb);
		});
	});

	Then(/^the word clouds should not be (\d+)$/, function (textValue, cb) {
		element.all(by.css('rect')).each(function (word) {
			expect(word.getAttribute('height')).to.eventually.not.be.equal(textValue.toString()).and.notify(cb);
		});
	});

	Then(/^the number of symbol points should be more than "([^"]*)"$/, function (symbolsNumber, cb) {
		var _symbols = element.all(by.css('.spec_symbol_point'));
		expect(_symbols.count()).to.eventually.be.above(0).and.notify(cb);
	});

	Then(/^the lines should not be "([^"]*)"$/, function (barValue, cb) {
		var _lines = element.all(by.css('.spec-line-value circle'));
		expect(_lines.count()).to.eventually.be.above(0);

		_lines.each(function (line) {
			expect(line.getAttribute('cx')).to.eventually.not.be.equal(barValue);
		}).then(cb);
	});

	Then(/^the pie chart grpah must not contain empty spaces between sections$/, function (cb) {
		function getPieChartAngle(){
			var a = 0;
			d3.select(('.spec-piechart-graph')).selectAll('.fan').each(function(){
				var d = d3.select(this).data()[0];
				a += d.endAngle - d.startAngle;
			});
			return a;
		}

		browser.executeScript(getPieChartAngle).then(function(_angle){
			var threesixtydegrees = 6.28318530718;
			expect(_angle.toFixed(8)).to.be.equal(threesixtydegrees.toFixed(8));
		}).then(cb);
	});

	Then(/^the cells on heat map table should not be empty$/, function (cb) {
		var cells = element.all(by.css('.spec-heatmap-cell'));
		expect(cells.count()).to.eventually.be.above(0);
		cells.each(function (cell) {
			expect(cell.isDisplayed()).to.eventually.be.true;
		}).then(cb);
	});

	Then(/^the "([^"]*)" axis label should be "([^"]*)"$/, function (axis, text, cb) {
		user.waits(1500);

		element(by.css('.spec-' + axis + '-axis-label')).getText().then(function (_text) {
			expect(_text).to.be.equal(text);
		}).then(cb);
	});

	Then(/^the "([^"]*)" axis pivot label should be "([^"]*)"$/, function (axis, text, cb) {
		user.waits(1500);

		element(by.css('.spec-' + axis + '-axis-label')).getText().then(function (_text) {
			if (text == 'Yes-No') expect(_text).to.be.equal('Yes/No');
			else expect(_text).to.be.equal(text);
		}).then(cb);
	});

	Then(/^the "([^"]*)" axis label should not appear$/, function (axis, cb) {
		user.waits(1500);

		element(by.css('.spec-'+axis+'-axis-label')).getText().then(function(_text){
			expect(_text).to.be.equal('');
		}).then(cb);
	});

	Then(/^the number of boxes displayed should be (\d+)$/, function (number, cb) {
		element.all(by.css('.spec-box-whisker-value')).count().then(function(num){
			expect(num).to.be.equal(parseInt(number));
		}).then(cb);
	});

	Then(/^A tooltip should appear in every box$/, function (cb) {
		element.all(by.css('.spec-box-whisker-value line + rect:not([height="0"])')).each(function(_box, index){
			brw.actions().mouseMove(_box).perform().then(function () {
				console.log('index', index);
				user.waits(1000);
				expect(element(by.css('.custom-chart-tooltip')).isDisplayed()).to.be.eventually.true;
			});
		}).then(cb);
	});


};