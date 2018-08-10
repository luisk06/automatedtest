'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user click on add image option$/, function(cb) {
		user.finds('.addImageAction').click().then(cb);
	});

	When(/^the user add image option to "([^"]*)"$/, function (typeOfInput, cb) {
		if (typeOfInput == 'url') {
			user.finds('.actions .uploadURL').click();
			user.finds('.spec-design-modal-image-url').clear().sendKeys('https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png');
			user.finds('.spec-design-modal-done-button').click();
		} else if (typeOfInput == 'desktop') {
			// browser.explore();
			var path = require('path'),
				remote = require('selenium-webdriver/remote'),
				absolutePath = path.resolve(__dirname, '../../../support/logos/google.png');

			brw.driver.setFileDetector(new remote.FileDetector());

			// -----> Apply only for firefox <-----
			// browser.executeAsyncScript(function(callback) {
			// 	document.querySelectorAll('#file-upload')[0]
			// 		.style.display = 'inline';
			// 	callback();
			// }).then(function(){

			// });

			element(by.css('.spec_image_option')).sendKeys(absolutePath);


		}
		user.waits(2500);

		expect(element(by.css('.spec-image-uploaded')).isDisplayed()).to.eventually.be.true;
		user.waits(500).then(function () {
			cb(); // Should be thus
		});
	});
};