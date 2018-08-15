'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user access public results URL$/, function (cb) {
		var qrveyID = configer.get('QrveyId');
		prs.getPublicResultsURL(qrveyID).then(function (data) {
			logger.log('data', data);
			webpage.openUrl(data.url).then(cb);
		});
	});

	Then(/^the analytiq chart for "([^"]*)" question on detailed view should be displayed$/, function (typeOfQuestion, cb) {
		var _el = '.spec-panel-container-0';
		element(by.css(_el)).isDisplayed().then(function (_isDisplayed) {
			expect(_isDisplayed).to.be.true;
		}).then(cb);
	});

	Then(/^the analytiq chart for "([^"]*)" question on tabular view should be displayed$/, function (typeOfQuestion, cb) {
		webpage.waitsFor('an-tabular-view');

		element(by.css('an-tabular-view')).isDisplayed().then(function (_isDisplayed) {
			expect(_isDisplayed).to.be.true;
		}).then(cb);
	});

	Then(/^the total of rows on table should be (\d+)$/, function (numberOfRows, cb) {
		scrollToTop(10000).then(function () {
			return element.all(by.css('.spec-analyzing-answered')).get(1).getText();
		}).then(function (numb) {
			expect(+numb).to.be.equal(parseInt(numberOfRows));
		}).then(cb);
	});

	When(/^the user waits (\d+) seconds$/, function (seconds, cb) {
		webpage.waits(seconds * 1000);
		cb();
	});
};