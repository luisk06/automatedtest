'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a qrvey with a short text question that has (\d+) answers$/, function(num, cb) {
		us.isLogged().then(function(_userId) {
			as.createAnswersForShortTextQuestion(_userId, 'survey', num).then(cb);
		});
	});

	When(/^the user writes "([^"]*)" in the "([^"]*)" "([^"]*)"$/, function(keys, identifier, type, cb) {
		navigate.sendKeys('.spec_' + identifier + '_' + type + ' div div input', keys);
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		maker.finds('.tag-template').click().then(cb);
	});

	Then(/^the "([^"]*)" short text answer filter should appear in the histogram filters$/, function(arg1, cb) {
		var answer = arg1.replace('"', '').replace('"', '').toLowerCase();

		element.all(by.css('.spec-analize-filters-list li .value-filter-bar')).get(0).getText().then(function(res) {
			logger.log(res.toLowerCase(), answer);
			expect(res.toLowerCase(), err.expressionFilter(answer, res)).to.contain(answer);
		}).then(cb);
	});
};