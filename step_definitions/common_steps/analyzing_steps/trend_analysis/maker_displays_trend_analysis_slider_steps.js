'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var average;

	When(/^user store "([^"]*)" average value$/, function(typeOfQestion, cb) {
		user.waits(2500);
		average = 0;
		var aux;
		var _element = element(by.css('.spec-' + typeOfQestion + '-average'));
		switch (typeOfQestion) {
			case 'slidebar':
				_element.getText().then(function(avg) {
					aux = avg.split(':');
					average = aux[1].trim();
				}).then(cb);
				break;
			case 'rating':
				_element.getText().then(function(avg) {
					aux = avg.split(' ');
					average = aux[0].trim();
				}).then(cb);
				break;
		}
	});

	Then(/^the average should be the same on every "([^"]*)" dot$/, function(typeOfQestion, cb) {
		var repeater = by.css('.spec-trend-dot');
		user.waits(1100);
		element.all(repeater).then(function(els) {
			els.forEach(function(ele, i, a) {
				brw.actions().mouseMove(a[i]).perform().then(function(){
					user.waits(500);
					element(by.css('.spec-trend-tooltip-down')).getText().then(function(_text) {
						var text = _text.split(':');
						var value = text[1].trim();
						expect(average).to.be.equal(value);
					});
				});
			});
		}).then(cb);
	});
};