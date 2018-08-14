'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on the Add button$/, function (cb) {
		var _el = user.findsAll('.spec-design-add-state');
		_el.count().then(function (_count) {
			if (_count == 0) throw new Error('The element was not found, it not possible to clicks');
			else {
				_el.get(_count - 1).click().then(cb);
			}
		});
	});

	When(/^the user has added questions$/, function (cb) {
		user.createsMultiChoiceTypeQuestion('Title').then(function () {
			user.finds('.spec-multichoice-option-1').sendKeys('Option 1').then(function () {
				user.finds('.spec-multichoice-option-2').sendKeys('Option 2').then(cb);
			});
		});
	});

	When(/^the user clicks on '([^']*)'$/, function (opt, cb) {

		var _el = user.findsAll('.spec-design-' + opt);
		_el.count().then(function (_count) {
			if (_count == 0) throw new Error('The element was not found, it not possible to clicks');
			else {
				_el.get(_count - 1).click().then(cb);
			}
		});
	});

	When(/^the user clicks on publish tab$/, function (cb) {
		navigate.clicksButton('.spec-tab-to-share').then(cb);
	});

	Then(/^the user get an error$/, function (cb) {
		user.finds('.spec-qrvey-btn-active').click();
		user.finds('.modal-dialog').isDisplayed().then(function (_displayed) {
			expect(_displayed).to.be.true;
		});
		user.finds('.modal-dialog .sub').getText().then(function (_text) {
			expect(_text).to.be.equal('Your webform is incomplete. Please return to the Design tab for more information.');
		}).then(cb);
	});
};