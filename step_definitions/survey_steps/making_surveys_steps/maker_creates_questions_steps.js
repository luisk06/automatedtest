'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var longText, leftValue, rightValue;

	When(/^the user tries to writes the "([^"]*)" with more than (\d+) chars$/, function(type, size, cb) {
		var e1, e2, t1, t2 = null;
		longText = rand.getText(+size + 30);

		if (type == 'question title') {
			e1 = '.spec-edit-question-name-any';
			t1 = longText;

			e2 = '.spec-multichoice-option-1';
			t2 = 'test option 1';
		} else if (type == 'answer of a question') {
			e1 = '.spec-edit-question-name-any';
			t1 = 'question title example';

			e2 = '.spec-multichoice-option-1';
			t2 = longText;
		}

		user.finds(e1).sendKeys(t1);
		user.finds(e2).sendKeys(t2).then(cb);
	});

	Then(/^the text will be the first (\d+) chars of the original written "([^"]*)"$/, function(size, type, cb) {
		var el = null,
			text = null;

		if (type === 'title') {
			el = '.spec-edit-question-name-any';
			text = longText;
		} else if (type === 'answer') {
			el = '.spec-multichoice-option-1';
			text = longText;
		}

		expect(text.substring(0, +size).length).to.eql(+size);

		user.finds(el).getAttribute('value').then(function(_text) {
			expect(_text).to.be.equal(text.substring(0, +size));
		}).then(cb);
	});

	When(/^the user tries to writes the left and right value with more than (\d+) chars$/, function(size, cb) {
		leftValue = rand.getText(+size + 30);
		rightValue = rand.getText(+size + 30);

		qrvey.questionType('spec_sl_qt');

		navigate.sendKeys('.spec-slidebar-question-type-answer-left', leftValue);
		navigate.sendKeys('.spec-slidebar-question-type-answer-right', rightValue).then(cb);
	});

	Then(/^the left and write value will be the first (\d+) chars of the original written left and right values$/, function(size, cb) {
		var left = user.finds('.spec-slidebar-question-type-answer-left').getAttribute('value'),
			right = user.finds('.spec-slidebar-question-type-answer-right').getAttribute('value');

		expect(left).to.eventually.not.be.empty;
		expect(right).to.eventually.not.be.empty;

		left.then(function(_text) {
			expect(_text.substring(0, +size).length).to.be.equal(+size);

			right.then(function(_text) {
				expect(_text.substring(0, +size).length).to.be.equal(+size);
			}).then(cb);
		});
	});
};