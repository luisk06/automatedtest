'use strict';

module.exports = function() {
	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes the slidebar question$/, function(cb) {
		var titleText = 'How satisfied are you with this product ?';
		var leftText = 'Very Satisfied';
		var rigthText = 'Very Unsatisfied';

		var el = user.finds('.spec-edit-question-name-any');

		el
			.clear()
			.sendKeys(titleText);

		user.waits(1000);

		el
			.getAttribute('value')
			.then(function(_text){
				expect(_text).to.be.equal(titleText);
			});

		// user.waits(500);

		el = user.finds('.spec-slidebar-question-type-answer-left');

		el
			.clear()
			.sendKeys(leftText);

		user.waits(1000);

		el
			.getAttribute('value')
			.then(function (_text) {
				expect(_text).to.be.equal(leftText);
			});


		user.waits(500);

		el = user.finds('.spec-slidebar-question-type-answer-right');


		el
			.clear()
			.sendKeys(rigthText);

		user.waits(500);

		el
			.getAttribute('value')
			.then(function (_text) {
				expect(_text).to.be.equal(rigthText);
			})
			.then(cb);
	});

	When(/^selects the number (\d+)$/, function(num, cb) {
		element(by.css('.spec-slidebar-number-option-' + num + ' + label')).click();
		expect(element(by.css('.spec-slidebar-number-option-' + num)).isSelected()).to.eventually.be.true;
		cb();
	});
};