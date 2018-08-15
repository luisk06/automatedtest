'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user adds a multiple choice question$/, function(cb) {
		maker.createsMultiChoiceTypeQuestion().then(cb);
	});

	When(/^the user adds the answer choices$/, function(cb) {
		maker.createsListOptions('multichoice').then(cb);
	});

	// When(/^activates the Paths option$/, function(cb) {
	// 	user.activatesPath().then(cb);
	// });

	Then(/^the user will see the paths they created below the question as tabs$/, function(cb) {
		maker.opensPathQuestion(1).then(cb);
	});

	Given(/^that the user adds a Yes\/No question$/, function(cb) {
		maker.createsYesOrNotQuestion().then(cb);
	});

	Then(/^the paths checkbox inside the path question should not be displayed$/, function(cb) {
		element
			.all(by.css('.spec-paths-question-0 span'))
			.count()
			.then(function(length) {
				navigate.asyncLoop(length - 1, function(loop) {
					element.all(by.css('.spec-paths-question-0 span')).get(loop.iteration() + 1).click();
					element(by.repeater('question in routes_questions')).click();
					element.all(by.css('.spec-question-' + loop.iteration() + '-checkboxes div'))
						.then(function(res) {
							//TODO: res is not getting the 2 divs after the first iteration of the for loop
							res.forEach(function(ele, i, a) {
								a[i].getAttribute('innerHTML').then(function(text) {
									expect(text).to.not.contain('Add Paths');
									expect(a.length).to.be.eql(2);
								});
							});
						}).then(loop.next());
				}, cb);
			});
	});
};
