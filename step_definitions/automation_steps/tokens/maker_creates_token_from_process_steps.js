'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on add token$/, function(cb) {
		element(by.css('.spec-automatiq-add-token')).click().then(cb);
	});

	When(/^the user selects qrvey (\d+) on token modal$/, function(qrveyNumber, cb) {
		webpage.waitsFor('.spec-automatiq-token-select-qrvey');
		element(by.css('.spec-automatiq-token-select-qrvey')).click().then(function() {
			element(by.css('.spec-automatiq-token-qrvey-option-' + qrveyNumber)).click();
		}).then(cb);
	});

	When(/^the user selects question (\d+) on token modal$/, function(questionNumber, cb) {
		webpage.waits(1000).then(function() {
			element(by.css('.spec-automatiq-token-question-option-' + questionNumber)).click().then(cb);
		});
	});

	When(/^the user fills "([^"]*)" on label$/, function(labelText, cb) {
		webpage.waits(600).then(function() {
			element(by.css('.spec-automatiq-token-label-input')).sendKeys(labelText).then(cb);
		});
	});

	When(/^the user clicks add on token modal$/, function(cb) {
		element(by.css('.spec-automatiq-token-add-button')).click().then(cb);
	});

	When(/^the user clicks on delete token (\d+)$/, function(tokenNumb, cb) {
		var token = element.all(by.css('.spec-automatiq-added-token')).get(tokenNumb - 1);
		token.element(by.css('.spec-automatiq-token-remove')).click().then(cb);
	});

	Then(/^the token should be added on modal$/, function(cb) {
		expect(element.all(by.css('.spec-automatiq-added-token')).count()).to.eventually.be.above(0).and.notify(cb);
	});

	Then(/^the token should be added after closing modal$/, function(cb) {
		element(by.css('.spec-close-modal')).click().then(function() {
			expect(element.all(by.css('.spec-automatiq-token-added')).count()).to.eventually.be.above(0).and.notify(cb);
		});
	});

	Then(/^the token created alert should be displayed$/, function(cb) {
		webpage.waits(300).then(function() {
			expect(
				webpage.isDisplayed(
					element(by.css('.spec-automatiq-token-exist'))
				)
			).to.eventually.be.true.and.notify(cb);
		});
	});

	Then(/^in the panel should not exists this token "([^"]*)"$/, function(token, cb) {
		element.all(by.repeater('key in TKC.keys')).then(function(els) {
			els.forEach(function(ele, i, a) {
				a[i].element(by.css('.tokens-label')).getText().then(function(_text) {
					expect(_text).to.be.not.equal(token);
				});
			});
		}).then(cb);
	});
};
