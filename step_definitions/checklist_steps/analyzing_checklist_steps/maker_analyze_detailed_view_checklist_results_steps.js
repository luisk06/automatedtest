module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user exclude (\d+) answers from list$/, function (numberExcluded, cb) {
		var _allElements = element.all(by.repeater('item in results.individual.ACTIVE.Items track by item.answerid'));
		for (var i = 0; i < numberExcluded; i++) {
			_allElements.get(0).element(by.css('th span')).click();
		}
		cb();
	});

	When(/^the user moves to "([^"]*)" tab$/, function (tabType, cb) {
		maker.finds('.spec-tab-' + tabType).click().then(cb);
	});

	When(/^the user clicks on reset filters$/, function (cb) {
		maker.finds('.spec-analyze-btn-reset-all').click().then(cb);
	});

	Then(/^the number of excluded answers should be (\d+)$/, function (numberExcluded, cb) {
		var repeater = by.repeater('item in results.individual.EXCLUDED.Items  track by item.answerid');
		expect(element.all(repeater).count()).to.eventually.be.equal(parseInt(numberExcluded)).and.notify(cb);
	});
};