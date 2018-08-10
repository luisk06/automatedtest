'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes the Ranking question and options$/, function(cb) {
		user.fillsRankingQuestion({
			'1': 'What is your favorite test question?',
			'2': 'Yes/no question',
			'3': 'Ranking question'
		}).then(cb);
	});
};
