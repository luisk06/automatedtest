'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes the expression question title$/, function(cb) {
		qrvey.fillExpressionQuestionTitle('How do you feel?').then(cb);
	});

	When(/^the user writes the possible answers$/, function(cb) {
		var num = rand.getNumber({
			min: 1,
			max: 20
		});

		maker.fillExpressionQuestionAnswers(num).then(cb);
	});

	When(/^that the user marks the active categories checkbox$/, function(cb) {
		qrvey.activateCategoriesInExpressionQuestions().then(cb);
	});

	When(/^the positive and negative input field are displayed$/, function(cb) {
		expect(element(by.css('.spec_input_positive_expression_word')).isDisplayed()).to.eventually.be.true;
		expect(element(by.css('.spec_input_negative_expression_word')).isDisplayed()).to.eventually.be.true.and.notify(cb);
	});

	When(/^writes the possible positive answers$/, function(cb) {
		var num = rand.getNumber({
			min: 1,
			max: 10
		});

		maker.fillExpressionQuestionAnswers(num, 'positive').then(cb);
	});

	When(/^writes the possible negative answers$/, function(cb) {
		var num = rand.getNumber({
			min: 1,
			max: 10
		});

		maker.fillExpressionQuestionAnswers(num, 'negative').then(cb);
	});

	When(/^the user starts writing some possible answer$/, function(cb) {
		navigate.sendKeys('#spec_input_expression_word input.input', 'E').then(cb);
	});

	Then(/^the suggested expressions should be displayed$/, function(cb) {
		webpage.waits(2000).then(function() {
			expect(element(by.css('.suggestion-list')).isDisplayed()).to.eventually.be.true.and.notify(cb);
		});
	});
};
