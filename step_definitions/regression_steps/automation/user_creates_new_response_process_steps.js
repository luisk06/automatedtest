'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on AddCondition$/, function (cb) {
		webpage.waits(300);
		user.findsXpath('//span[contains(text(),"+ Add Condition")]').click().then(cb);
	});

	When(/^the user type a score that that does not exceed the top score in (\d+) Pts input$/, function (inputType, cb) {
		element(by.css('.automatiq-condition input')).sendKeys(inputType).then(cb);
	});

	When(/^the user type a score that that exceed the top score in "([^']*)" input$/, function (inputType, cb) {
		element(by.css('.automatiq-condition input')).sendKeys('10').then(cb);
	});

	When(/^the user opens the actions inside a condition$/, function (cb) {
		// element.all(by.css('.spec-automatiq-block-action-view-open')).get(0).click().then(cb);
		element.all(by.css('.automatiq-block-edit')).get(0).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" action inside a condition$/, function (typeOfAction, cb) {
		webpage.waits(1000).then(function () {
			return element.all(by.css('.spec-automatiq-select-action-open')).get(0).click();
		}).then(function () {
			element.all(by.css('.spec-automatiq-select-action-' + typeOfAction)).get(0).click().then(cb);
		});
	});

	When(/^the user selects the "([^']*)" option$/, function (typeOfCondition, cb) {
		if (typeOfCondition == 'field(s)'){
			element(by.xpath('//li[contains(text(),"' + (typeOfCondition.charAt(0).toUpperCase() + typeOfCondition.slice(1)) + '")]')).click().then(cb);
		}else{
			element(by.xpath('//li[contains(text(),"If ' + (typeOfCondition.charAt(0).toUpperCase() + typeOfCondition.slice(1)) + ' is")]')).click().then(cb);
		}
	});

	When(/^the user clicks on the condition dropdown$/, function (cb) {
		element(by.xpath('//*[contains(@class,"automatiq-condition")]')).click().then(cb);
	});

	When(/^the user add the first field$/, function (cb) {
		user.finds('.spec-automatiq-add-field').click();
		user.findsAll('.spec-automatiq-add-field li').get(1).click().then(cb);
	});

	When(/^the user selects "([^']*)" as answer condition$/, function (answerCondition, cb) {
		var condition = '';

		if (answerCondition == 'greater than' || answerCondition == 'less than' || answerCondition == 'equal to'){
			condition = answerCondition.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
		} else {
			condition = answerCondition.charAt(0).toUpperCase() + answerCondition.slice(1);
		}

		element(by.xpath('//span[contains(text(),"Greater Than")]')).click().then(function () {
			element(by.xpath('//li[contains(text(),"' + condition + '")]')).click().then(cb);
		});
	});

	When(/^the user selects "([^']*)" as answer condition for the question$/, function (answerCondition, cb) {
		var condition = '';

		if (answerCondition == 'not empty'){
			condition = 'not Empty';
		} else {
			condition = answerCondition.charAt(0).toUpperCase() + answerCondition.slice(1);
		}

		element(by.xpath('//span[contains(text(),"- Condition -")]')).click().then(function () {
			element(by.xpath('//li[contains(text(),"' + condition + '")]')).click().then(cb);
		});
	});

	When(/^the user selects the first question as field answers$/, function (cb) {
		element(by.xpath('//span[contains(text(),"Select a question")]')).click().then(function () {
			element(by.xpath('//li[contains(text(),"Who is your favorite game of thrones character?")]')).click().then(cb);
		});
	});

	Then(/^the page is saved$/, function (cb) {
		webpage.waits(1000).then(function () {
			expect(element.all(by.repeater('page in PD.data.pages track by page.pageid')).count()).to.eventually.be.above(0).and.notify(cb);
		});
	});

	Then(/^the process is saved$/, function (cb) {
		webpage.waits(1000).then(function () {
			expect(element.all(by.repeater('process in WD.processes.data')).count()).to.eventually.be.above(0).and.notify(cb);
		});
	});

	Then(/^the trigger is saved$/, function (cb) {
		expect(element.all(by.repeater('trigger in vm.process.triggers')).count()).to.eventually.be.above(0).and.notify(cb);
	});

	Then(/^the action is saved$/, function (cb) {
		// expect(element.all(by.repeater('page in PD.data.pages track by page.pageid')).count()).to.eventually.be.above(0).and.notify(cb);
		expect(element.all(by.repeater('action in vm.process.body')).count()).to.eventually.be.above(0).and.notify(cb);
	});

	Then(/^the process is not saved$/, function(cb){
		element(by.css('.process')).isPresent().then(function (_isPresent) {
			expect(_isPresent).to.be.false;
		}).then(cb);
	});
};