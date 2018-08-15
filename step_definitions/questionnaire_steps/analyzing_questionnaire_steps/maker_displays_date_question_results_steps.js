'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user clicks on select columns menu$/, function(cb) {
		element(by.id('columns-dropdown')).click().then(cb);
	});

	Given(/^the user clicks on show all columns option$/, function(cb) {
		element(by.css('.spec-show-all-columns')).click().then(cb);
	});

	When(/^the user uncheck all columns$/, function(cb) {
		element.all(by.css('div.checkbox:not(.ng-hide) label')).each(function(elem) {
			elem.click().then(function() {
				brw.sleep(100);
			});
		}).then(cb);
	});

	When(/^the user check all columns$/, function(cb) {
		element.all(by.css('div.checkbox:not(.ng-hide) label')).each(function(elem) {
			elem.click().then(function() {
				brw.sleep(100);
			});
		}).then(cb);
	});

	When(/^the user clicks on sort column button$/, function(cb) {


		var sort = element.all(by.css('.dx-sort-none')).last();
		user.waitForElement(sort);
		sort.click().then(cb);
	});

	When(/^the first result must be "([^"]*)"$/, function(result, cb) {
		webpage.waits(1500);
		element.all(by.css('.dx-data-row td')).get(0).getText().then(function(_value) {
			expect(_value).to.be.equal(result);
		}).then(cb);
	});

	When(/^the user clicks on the "([^"]*)" option of analyze section$/, function(section, cb) {
		webpage.waits(2000);
		if (section == 'edit') {
			element(by.css('.form-edit')).click().then(cb);
		} else {
			element(by.css('.spec-form-' + section)).click().then(cb);
		}
	});

	When(/^the user select a column in the form table to apply "([^"]*)"$/, function(option, cb) {
		element.all(by.css('.dx-header-row .dx-datagrid-text-content')).first().click().then(cb);
	});

	When(/^the "([^"]*)" was succefully applied$/, function(option, cb) {
		expect(webpage.waitsFor((option == 'bucket') ? '.bucketed-label' : '.dx-group-row')).to.eventually.be.true.and.notify(cb);
	});

	When(/^the user clicks aggregate menu$/, function(cb) {
		user.finds('body').click();
		webpage.waits(2000);

		var el = '.dx-dropdowneditor-button.dx-button-normal.dx-widget';

		webpage.waitsFor(el);
		element.all(by.css(el)).get(0).click().then(cb);
	});

	When(/^the user select the count option$/, function(cb) {
		element(by.css('.dx-item-content.dx-list-item-content')).click().then(cb);
	});

	When(/^the user hits the count option$/, function(cb) {
		webpage.waits(2000);
		browser.actions().mouseMove(element(by.css('.dx-texteditor-buttons-container')), {x:20,y:30}).click().perform();
		webpage.waits(2500).then(function () {
			cb(); // Should be thus
		});
	});

	Then(/^the user can see the number of answers$/, function(cb) {
		webpage.waits(2000);

		element.all(by.css('.dx-data-row')).count().then(function(num){
			expect(element(by.xpath('//div[contains(text(),\'Count:\')]')).getText()).to.eventually.be.equal('Count: '+num).and.notify(cb);
		});
	});

	Then(/^the form results dashboard is empty$/, function(cb) {
		cb();
	});
};