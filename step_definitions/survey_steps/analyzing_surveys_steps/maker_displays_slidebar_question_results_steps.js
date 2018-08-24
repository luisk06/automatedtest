'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a webform app with a "([^"]*)" with a slidebar question that has (\d+) stops and (\d+) answers$/, function(typeOfQrvey, answers, stops, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test ' + typeOfQrvey + ' slidebar').then(function(){
				as.createAnswers(_userId, typeOfQrvey, 'slidebar', answers).then(function(){
					webpage.waits(5000);
				}).then(cb);
			});
		});
	});

	Then(/^the (\d+) is a slidebar answer filter should appear in the histogram filters$/, function(answer, cb) {
		logger.log('answer', answer);
		var _found = false;

		element.all(by.css('.spec-analize-filters-list li')).each(function(_item) {
			return _item.getText().then(function(res) {
				logger.log('res', res);
				_found = true;
				expect(res, err.expressionFilter(answer, res)).to.contain(answer);
			}).then(cb);
		}).then(function() {
			if (!_found && answer == 3) {
				cb();
			}
		});
	});

	When(/^the user clicks on the (\d+) filter as bar in a "([^"]*)" question$/, function(numberOfBar, type, cb) {
		var _element = 'rect[data-id*="spec"]';
		var _class = null;
		var _el = null;

		webpage.waitsForClickeable(_element);

		if (numberOfBar != 0) {
			_class = 'rect[data-id="spec-' + type + '-bar-' + numberOfBar + '"]';
			_el = element.all(by.css(_class)).first();

			logger.log('rect1', _class);

			brw.actions().mouseMove(_el, {
				x: -10,
				y: 0
			}).mouseDown().mouseMove(_el, {
				x: 75,
				y: 0
			}).mouseUp().perform().then(function(){
				cb();
			});
		} else {
			_class = 'rect[data-id="spec-' + type + '-bar-2"]';
			_el = element(by.css(_class));

			logger.log('rect', _class);
			brw.actions().mouseMove(_el, {
				x: 300,
				y: 0
			}).mouseDown().mouseMove(_el, {
				x: 385,
				y: 0
			}).mouseUp().perform().then(function(){
				cb();
			});
		}
	});
};
