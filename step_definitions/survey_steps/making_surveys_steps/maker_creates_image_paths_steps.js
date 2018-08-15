'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user adds all images to question since "([^"]*)"$/, function(typeOfInput, cb) {
		var i = 1;

		if (typeOfInput == 'url') {
			maker.findsAll('.spec-image-upload-option-url').each(function() {
				maker.finds('.spec-image-upload-option-url-' + i).click();
				maker.finds('.spec-design-modal-image-url').clear().sendKeys('https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png');
				maker.finds('.spec-design-modal-done-button').click();
				i++;
			}).then(cb);
		} else if (typeOfInput == 'desktop') {
			var path = require('path'),
				remote = require('selenium-webdriver/remote'),
				absolutePath = path.resolve(__dirname, '../../support/logos/google.png');

			brw.driver.setFileDetector(new remote.FileDetector());

			maker.findsAll('.spec-image-upload-option-desktop').each(function() {
				maker.finds('.spec-image-upload-option-desktop-' + i).sendKeys(absolutePath).getAttribute('value').then(function(_text) {
					expect(_text.slice(12, _text.length)).to.be.equal('google.png');
					webpage.waits(500);
				});

				i++;
			}).then(cb);
		}
	});

	When(/^the user adds all title to images$/, function(cb) {
		var i = 1,
			_title = null;

		maker.findsAll('.spec-design-image-title').each(function() {
			_title = rand.getText(61);

			maker.finds('.spec-design-image-title-' + i).sendKeys(_title).getAttribute('value').then(function(_text) {
				expect(_text.length).to.be.equal(60);
			});

			i++;
		}).then(cb);
	});

	// When(/^the user clicks on the "([^"]*)" option$/, function(arg1, cb) {
	// 	maker.finds('#go_share_button').click().then(cb); // so bad, we need to change it
	// });

	Then(/^the "([^"]*)" error should be displayed$/, function(arg1, cb) {
		expect(maker.getText('.alert-error')).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the user clicks on "([^"]*)" button$/, function(cb) {
		maker.finds('.spec-qrvey-btn-active').click().then(cb);
	});

	When(/^selects your question to be the path question$/, function(cb) {
		element.all(by.css('.spec-paths-question-0 span')).get(1).click();
		element(by.repeater('question in routes_questions')).click();
		maker.finds('.spec-select-option-question_00').click();
		maker.finds('#spec_yn_qt').click();
		navigate.sendKeys('.spec-path-question-title-00', 'Question 1 Path 1 yes/no-sub-question 1').then(cb);
	});
};