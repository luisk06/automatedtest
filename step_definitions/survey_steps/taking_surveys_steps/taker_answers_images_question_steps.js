'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects (\d+) random image answer choice$/, function(long, cb) {
		var num = 1,
			array = [],
			sw = false;

		element.all(by.css('.list-answers-multiple')).count().then(function(_count) {
			async.eachSeries(gArray(long), function(item, next) {
				sw = false;

				while (!sw) {
					num = rand.getNumber({
						float: false,
						min: 0,
						max: _count - 1
					});

					if (_.size(array) == _count) cb();

					if (!_.includes(array, num)) {
						sw = true;
						array.push(num);
						var _el = element.all(by.css('.list-answers-multiple')).get(num);
						scrollIntoElement(_el).then(function(){
							_el.click().then(function(){
								next();
							});
						});
					}
				}
			}, function() {
				cb();
			});
		});
	});
};
