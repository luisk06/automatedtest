'use strict';

module.exports = function() {
	
	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the "([^"]*)" filter should appear on the histogram filters$/, function(arg1, cb) {
		var answer = arg1.replace('"', '').replace('"', '');
		logger.log('answer', answer);
		element.all(by.css('.spec-analize-filters-list li .value-filter-bar')).get(0).getText().then(function(res) {
			expect(res, err.expressionFilter(answer, res)).to.contain(answer);
		}).then(cb);
	});

	Then(/^the number of answers inside filter panel should be (\d+)$/, function(num, cb) {
		element.all(by.css('.spec-filter-container')).count().then(function(res) {
			expect(res.toString(), 'Filters are not being applied correctly').to.be.equal(num);
		}).then(cb);
	});

	Then(/^the answer showed inside filter panel should have percentage and value$/, function(cb) {
		element.all(by.css('.spec-filter-container .spec-date-text')).get(0).getText().then(function(res) {
			expect(res.toString(), 'Filters are being applied but percentage and values are not shown').to.not.be.equal('');
		}).then(cb);
	});
};
