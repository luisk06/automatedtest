'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes the question and answers of a "([^"]*)" question$/, function(typeOfQuestion, cb) {
		switch (typeOfQuestion) {
			case 'yes-no':
			case 'yes_no':
			case 'yes no':
			case 'rating':
				navigate.sendKeys('.spec-edit-question-name-any', 'The ' + typeOfQuestion + ' question title').then(cb);
				break;
			case 'nps':
				navigate.sendKeys('#incontext-business-name', 'The ' + typeOfQuestion + ' question title').then(cb);
				break;
			case 'slider bar':
			case 'slider-bar':
			case 'slider_bar':
				navigate.sendKeys('.spec-edit-question-name-any', 'The slidebar question title');
				navigate.sendKeys('.spec-slidebar-question-type-answer-left', 'The left answer');
				navigate.sendKeys('.spec-slidebar-question-type-answer-right', 'The right answer').then(cb);
				break;
			case 'multiple choice':
			case 'multiple_choice':
			case 'multiple-choice':
				taker.answersMultipleChoiceQuestion().then(cb);
				break;
			case 'numeric':
				taker.answersNumericQuestion(12).then(cb);
				break;
			case 'ranking':
				navigate.sendKeys('.spec-edit-question-name-any', 'The ' + typeOfQuestion + ' question title');
				user.finds('.spec-add-option-ranking-question-0').click();
				user.finds('.spec-add-option-ranking-question-0').click();
				user.finds('.spec-add-option-ranking-question-0').click();
				user.finds('.spec-add-option-ranking-question-0').click();
				navigate.sendKeys('.spec-ranking-option-1', 'Option 1');
				navigate.sendKeys('.spec-ranking-option-2', 'Option 2');
				navigate.sendKeys('.spec-ranking-option-3', 'Option 3');
				navigate.sendKeys('.spec-ranking-option-4', 'Option 4');
				navigate.sendKeys('.spec-ranking-option-5', 'Option 5');
				navigate.sendKeys('.spec-ranking-option-6', 'Option 6').then(cb);
				break;
			default:
				navigate.sendKeys('.spec-edit-question-name-any', 'The question title').then(cb);
		}
	});
};
