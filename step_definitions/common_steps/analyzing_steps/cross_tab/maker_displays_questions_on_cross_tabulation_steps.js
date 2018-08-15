'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has webform app with a "([^"]*)" with cross tab compatible questions$/, function(typeOfQrvey, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test Cross tabulation').then(function(){
				qs.createCrossTab(_userId, typeOfQrvey).then(function(data) {
					logger.log('data', data);
					webpage.waits(5000);
					webpage.openUrl(data.url).then(cb);
				});
			});
		});
	});

	Given(/^the user has webform app with a "([^"]*)" with cross tab compatible questions with (\d+) responses$/, function(typeOfQrvey, num, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test Cross tabulation').then(function(){
				as.createAnswersForCrossTab(_userId, typeOfQrvey, num).then(function(data) {
					webpage.waits(5000);
					logger.log('qrveys.data', data);
				}).then(cb);
			});
		});
	});

	When(/^the user selects "([^"]*)" from main dropdown$/, function(typeOfQuestion, cb) {
		var questionOption = 0;

		switch (typeOfQuestion) {
			case 'Multiple Choice':
				questionOption = 1;
				break;
			case 'Rating':
				questionOption = 2;
				break;
			case 'Yes - No':
				questionOption = 3;
				break;
			case 'Image':
				questionOption = 4;
				break;
			default:
				questionOption = 1;
				break;
		}

		element(by.css('.spec-crosstab-drop-main')).click().then(function() {
			element(by.css('.spec-crosstab-main-option-' + questionOption)).click();
		}).then(cb);
	});

	When(/^the user selects "([^"]*)" from compare dropdown$/, function(typeOfQuestion, cb) {
		var compareDropDown = element(by.css('.spec-crosstab-drop-compare'));

		compareDropDown.click().then(function() {
			compareDropDown.element(by.xpath('.//li[contains(text(), "' + typeOfQuestion + '")]')).click();
		}).then(function() {
			webpage.waits(600).then(function () {
				cb(); // Should be thus
			});
		});
	});

	When(/^the user selects add all questions from compare dropdown$/, function(cb) {
		var compareDropDown = element(by.css('.spec-crosstab-drop-compare'));

		compareDropDown.click().then(function() {
			element(by.css('.spec-crosstab-add-all')).click();
		}).then(function() {
			webpage.waits(600).then(function () {
				cb(); // Should be thus
			});
		});
	});

	When(/^the user selects remove all questions from compare dropdown$/, function(cb) {
		var compareDropDown = element(by.css('.spec-crosstab-drop-compare'));

		compareDropDown.click().then(function() {
			element(by.css('.spec-crosstab-remove-all')).click();
		}).then(function() {
			webpage.waits(600).then(function () {
				cb(); // Should be thus
			});
		});
	});

	Then(/^cross tabulation table should be displayed$/, function(cb) {
		element(by.css('.crosstab-header')).isDisplayed().then(function(_isDisplayed) {
			expect(_isDisplayed).to.be.true;
		}).then(cb);
	});

	Then(/^cross tabulation table should not be displayed$/, function(cb) {
		element(by.css('.crosstab-header')).isDisplayed().then(function(_isDisplayed) {
			expect(_isDisplayed).to.be.false;
		}).then(cb);
	});

	Then(/^the number of crosstab columns should be (\d+)$/, function(num, cb) {
		element.all(by.css('.spec-crosstab-main-option-added')).count().then(function(_count) {
			expect(_count).to.be.equal(parseInt(num));
		}).then(cb);
	});

	Then(/^the number of questions added to crosstab should be (\d+)$/, function(num, cb) {
		element.all(by.css('.spec-crosstab-question-added')).count().then(function(_count) {
			expect(_count).to.be.equal(parseInt(num));
		}).then(cb);
	});

	Then(/^all cells on cross tab table should not be empty$/, function(cb) {
		element.all(by.css('.spec-crosstab-cell-value')).each(function(cell) {
			expect(cell.getAttribute('innerHTML')).to.eventually.be.not.equal('');
		}).then(cb);
	});
};