// 'use strict';

// module.exports = function () {

// 	Given = this.Given;
// 	When = this.When;
// 	Then = this.Then;

// 	When(/^the user confirm the deletion of the template$/, function (cb) {
// 		element(by.css('.confirm-delete')).click().then(cb);

// 	});

// 	Then(/^the template was deleted$/, function (cb) {
// 		webpage.waits(3000);
// 		element.all(by.css('.template-box .content p')).get(0).getText().then(function (name) {
// 			expect(name).to.be.equal('TNE');
// 		}).then(cb);
// 	});
// };
