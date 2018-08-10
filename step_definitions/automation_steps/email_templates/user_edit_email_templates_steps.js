'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on edit template$/, function (cb) {
		var _el = element.all(by.css('.template-box')).get(1);

		_el.click().then(function(){
			brw.actions().mouseMove(_el,
				{	x: 300,
					y: 500
				}).perform()
				.then(function () {
					element.all(by.css('.option')).get(0).click().then(cb);
				});
		});
	});

	Then(/^the template was edited$/, function (cb) {
		user.waits(3000);
		element.all(by.css('.template-box .content p')).get(1).getText().then(function (name) {
			expect(name).to.be.equal('TNE');
		}).then(cb);
	});
};
