'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on email me the results$/, function(cb) {
		webpage.waits(7000).then(function() {
			maker.finds('#update-qrvey-answers').click().then(cb);
		});
	});

	Then(/^a sent email message should appear$/, function(cb) {
		webpage.waits(3000);
		var _element = maker.finds('.results-way');
		_element.isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});
};