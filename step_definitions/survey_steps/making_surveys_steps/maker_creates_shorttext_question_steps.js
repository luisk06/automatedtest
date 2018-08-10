'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var questionTitle = null;

	When(/^the user writes the Short Text question with less than (\d+) chars$/, function(arg1, cb) {
		questionTitle = rand.getText(+arg1 - 20);
		qrvey.fillTextFieldQuestion(questionTitle).then(cb);
	});

	When(/^the user writes the Short Text question with more than (\d+) chars$/, function(arg1, cb) {
		questionTitle = rand.getText(+arg1 + 30);
		qrvey.fillTextFieldQuestion(questionTitle).then(cb);
	});

	Then(/^the Short Text question should be saved with the exact string the user wrote$/, function(cb) {
		var ele = element(by.css('.spec-question-title')),
			isPresent = EC.presenceOf(ele),
			_outputText = null;

		brw.wait(isPresent, 5000);

		ele.getAttribute('value').then(function(savedQuestionTitle) {
			if (savedQuestionTitle !== null) {
				_outputText = savedQuestionTitle.substring(3, savedQuestionTitle.length);

				logger.log('outputText', _outputText);

				expect(_outputText.length, err.unmatchingLength(questionTitle.length, _outputText.length)).to.be.equal(questionTitle.length);
				expect(_outputText, err.unmatchingText(questionTitle, _outputText)).to.be.equal(questionTitle);
			}
		}).then(cb);
	});

	Then(/^the Short Text question should be saved with the first (\d+) chars the user wrote$/, function(arg1, cb) {
		var ele = element(by.css('.spec-question-title')),
			isPresent = EC.presenceOf(ele),
			_outputText = null;

		brw.wait(isPresent, 5000);

		ele.getAttribute('value').then(function(savedQuestionTitle) {
			if (savedQuestionTitle !== null) {
				_outputText = savedQuestionTitle.substring(3, savedQuestionTitle.length);

				logger.log('questionTitle length', questionTitle.substring(0, +arg1).length);
				logger.log('outputText length', _outputText.length);
				logger.log('questionTitle', questionTitle.substring(0, +arg1));
				logger.log('outputText', _outputText);

				expect(_outputText.length, err.unmatchingLength(questionTitle.substring(0, +arg1).length, _outputText.length)).to.be.equal(questionTitle.substring(0, +arg1).length);
				expect(_outputText, err.unmatchingText(questionTitle.substring(0, +arg1), _outputText)).to.be.equal(questionTitle.substring(0, +arg1));
			}
		}).then(cb);
	});
};
