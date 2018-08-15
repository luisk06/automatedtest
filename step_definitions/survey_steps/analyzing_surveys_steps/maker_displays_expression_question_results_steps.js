'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the "([^"]*)" expression answer filter should appear in the histogram filters$/, function(arg1, cb) {
		var answer = arg1.replace('"', '').replace('"', '');

		element.all(by.css('.spec-analize-filters-list li .value-filter-bar')).get(0).getText().then(function(res) {
			logger.log('Name', res);
			logger.log('answer', answer);
			expect(res, err.expressionFilter(answer, res)).to.contain(answer);
		}).then(cb);
	});

	Then(/^the percentages of the answers should be (\d+)$/, function(arg1, cb) {
		element.all(by.css('analytiq-chart svg g')).count().then(function(res) {
			var array = [];
			var totalPercentage = 0;
			for (var i = 0; i < res; i++) {
				array[i] = element.all(by.css('analytiq-chart svg g')).get(i).getText();
			}
			var perc = [];
			protractor.promise.all(array).then(function(results) {
				var aux = [];
				results.forEach(function(percentage) {
					var hey = percentage.split(' ');
					console.info('HEEEY:', hey);
					hey[0] = hey[0].split('\n');
					aux.push(hey[1].substring(0, hey[1].length - 1));
					aux.push(hey[0][1].substring(1, hey[0][1].length - 1));
					perc.push(aux);
					aux = [];
					totalPercentage = totalPercentage + parseInt(hey[1].substring(0, hey[1].length - 1));
				});
				expect(totalPercentage, err.totalPercentage(totalPercentage, +arg1)).to.be.eql(+arg1);
			}).then(function() {
				element(by.exactBinding('getResponsesAnalyze')).getText().then(function(ta) {
					var total = 0;
					perc.forEach(function(part) {
						total = total + (part[0] * part[1]);
					});
					expect(total / 100, err.totalAnswers(total / 100, +ta)).to.be.at.most(+ta);
				});
			}).then(cb);
		});
	});

	When(/^the user clicks on the expression answer "([^"]*)"$/, function(arg1, cb) {
		user.finds('g.sw[data-id="' + arg1 + '"] circle').click().then(cb);
	});
};