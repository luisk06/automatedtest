'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on the cell (\d+),(\d+)$/, function(cell1, cell2, cb) {
		logger.log('y:', cell2);

		var index = parseInt(cell1 * 4) + parseInt(cell2);
		var initialPos;

		logger.log('index:', index);
		logger.log('.QTable.preview footer div div.cell.showhide');

		element.all(by.css('.QTable.preview footer div div.cell.showhide')).getText().then(function(res) {
			logger.log('res:', res);

			var x = utils.cleanArray(res);
			initialPos = res.length - x.length;

			logger.log('initialPos:', initialPos);
			logger.log('get:', initialPos + index);

			webpage.waits(2000);
			element.all(by.css('.QTable.preview footer div div.cell.showhide')).get(initialPos + index).click().then(cb);
		});
	});

	When(/^the user clicks on the show more button in the questions answers$/, function(cb) {
		brw.sleep(3000);
		webpage.getsTextExists('Try resetting your filters to see results').then(function(res) {
			hasAnswers = !res;
			logger.log('hasAnswers', hasAnswers);
			if (!hasAnswers) {
				cb();
			} else {
				logger.log('else');
				maker.finds('.showmore-rigth').click();
				brw.sleep(750);
			}
		}).then(cb);
	});

	When(/^the user opens the filterbar$/, function(cb){
		maker.finds('.spec-open-filter-bar').click().then(cb);
	});

	Then(/^the (\d+),(\d+) ranking answer filter should appear in the histogram filters$/, function(arg1, arg2, cb) {
		var answerFilter = 'wrong answer';

		logger.log('ranking answer:');
		logger.log('arg1', arg1);
		logger.log('arg2', arg2);

		if (arg1 == 0 && (arg2 == 0 || arg2 == 1)) {
			answerFilter = 'Jon Snow';
		} else if ((arg1 == 0 && arg2 == 2) || (arg1 == 0 && arg2 == 3)) {
			answerFilter = 'Tyrion Lannister';
		} else if ((arg1 == 1 && arg2 == 1) || (arg1 == 2 && arg2 == 2) || (arg1 == 1 && (arg2 == 2 || arg2 == 3))) {
			answerFilter = 'Daenerys Targaryen';
		} else {
			answerFilter = 'Arya Stark';
		}

		logger.log('answerFilter:', answerFilter);

		element(by.css('.spec-analize-filters-list li')).getText().then(function(res) {
			expect(res).to.contain(answerFilter);
		}).then(cb);
	});
};
