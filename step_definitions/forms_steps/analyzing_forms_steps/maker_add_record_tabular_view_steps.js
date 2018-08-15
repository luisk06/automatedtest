'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks the "([^"]*)" record button$/, function (button, cb) {
		if (button == 'add') {
			element(by.css('.spec_form_add')).click().then(cb);
		} else if (button == 'delete') {
			element(by.css('.spec_form_delete')).click().then(cb);
		}
	});

	When(/^the user check the first record to "([^"]*)"$/, function (button, cb) {
		element.all(by.css('.dx-checkbox-icon')).get(1).click().then(cb);
	});

	When(/^the user check all the records to "([^"]*)"$/, function (button, cb) {
		element.all(by.css('.dx-checkbox-icon')).get(0).click().then(cb);
	});

	When(/^the user clicks the "([^"]*)" button to confirm$/, function (button, cb) {
		if (button == 'add') {
			webpage.waits(5000).then(function () {
				brw.switchTo().defaultContent();
				element(by.css('.spec_apply_filter_button')).click().then(cb);
			});
		} else if (button == 'delete') {
			element(by.css('.form-delete-2')).click().then(function () {
				element(by.css('#confirm-check + label')).click().then(function () {
					element(by.css('.spec_apply_filter_button')).click().then(cb);
				});
			});
		} else if (button == 'close') {
			element.all(by.css('.mode-box-info .right-side a')).get(0).click().then(cb);
		}
	});

	Then(/^the table should have (\d+) records$/, function (rows, cb) {
		webpage.waits(5000);

		brw.enterRepl();

		element.all(by.css('.dx-data-row')).count().then(function (num) {
			console.log('num', num.toString());
			console.log('rows', rows);
			expect(num.toString()).to.be.equal(rows);
		}).then(cb);
	});

	Then(/^the table should be empty$/, function (cb) {
		webpage.waits(5000).then(function () {
			element.all(by.css('.dx-data-row td')).count().then(function (num) {
				expect(num.toString()).to.be.equal('0');
			}).then(cb);
		});
	});

	When(/^the user close the modal in analyze$/, function (cb) {
		webpage.waits(2000);
		maker.finds('.AN-close-modal').click().then(cb);
	});

	When(/^the user closes the modal in analyze$/, function (cb) {
		webpage.waits(1500);
		browser.actions().mouseMove(element(by.css('.AN-close-modal'))).click().perform();
		webpage.waits(500).then(cb);

	});

	Then(/^the modal should not be hidden$/, function (cb) {
		var el = '.spec_apply_filter_button';

		webpage.waits(1000).then(function () {
			element(by.css(el)).isDisplayed().then(function (_isdisplayed) {
				// console.log('Is displayed');
				expect(_isdisplayed).to.be.true;
			}, function () {
				cb();
			}).then(cb);
		});
	});
};