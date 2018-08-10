'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on the the side icon$/, function(cb) {
		// var q1 = element(by.css('.spec-maker-move-question-0')),
		// 	q2 = element(by.css('.spec-maker-move-question-2'));

		qrvey.reorderQuestions().then(cb);
	});

	When(/^drags question to another position$/, function(cb) {
		cb();
	});

	Then(/^the questions will be reordered$/, function(cb) {
		cb();
	});
};
