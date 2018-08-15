'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on the open application option$/, function (num, type, cb) {
		maker.findsAll('.drop .options.show span').get(1).click().then(cb);
	});
};