'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a qrvey with a yes no question that has (\d+) answers$/, function(num, cb) {
		us.isLogged().then(function(_userId) {
			as.createAnswersForYesNoQuestion(_userId, 'survey', num).then(cb);
		});
	});

	Then(/^the "([^"]*)" is a yes no answer filter should appear in the histogram filters$/, function(arg1, cb) {
		var answer = arg1.replace('"', '').replace('"', '');
		logger.log('answer', answer);
		element.all(by.css('.spec-analize-filters-list li .value-filter-bar')).get(0).getText().then(function(res) {
			expect(res, err.expressionFilter(answer, res)).to.contain(answer);
		}).then(cb);
	});

	When(/^the user clicks on the incontext filter button$/, function(cb) {
		element(by.css('.spec-download-drop')).click().then(function(){
			element.all(by.css('.spec_filter_button_1')).get(0).click().then(cb);
		});
	});
};
