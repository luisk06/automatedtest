'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects the right answer in a "([^"]*)" question$/, function(typeOfQuestion, cb) {
		var _answer = '';

		switch (typeOfQuestion) {
			case 'yes no':
			case 'yes-no':
			case 'yes_no':
				_answer = '.spec-quiz-right-answer-Yes';
				break;
			case 'image':
			case 'multiple choice':
			case 'multiple-choice':
			case 'multiple_choice':
				_answer = '.spec-quiz-right-answer';
				break;
		}
		brw.executeScript('window.scrollTo(0,0);').then(function(){
			element(by.css(_answer)).click().then(cb);
		});
	});

	// When(/^the user should changes the view for "([^"]*)"$/, function(typeOfView, cb) {
	// 	var _el = '';

	// 	element(by.css('.spec-filter-analyze')).click();

	// 	if (typeOfView == 'summary') {
	// 		_el = '#spec-panelview-multi';
	// 	}

	// 	element(by.css(_el)).click().then(cb);
	// });
};