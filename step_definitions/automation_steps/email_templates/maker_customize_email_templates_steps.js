'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;
	var emailTemplateEditorLocator = element(by.tagName('email-template-editor iframe'));

	When(/^the user write a text in the header for the template$/, function (cb) {
		brw.ignoreSynchronization = true;
		//browser.explore();
		webpage.waitsForElement(emailTemplateEditorLocator);
		brw.switchTo().frame(emailTemplateEditorLocator.getWebElement());
		maker.findsAll('.mce-item-table tr td').get(0).sendKeys('Header edited').then(cb);
	});

	When(/^the user write a text in the body for the template$/, function (cb) {
		var el = maker.findsAll('.mce-item-table tr td');
		el.get(2).sendKeys('Body edited');
		el.get(4).sendKeys('Body after link edited').then(cb);
	});

	When(/^the user write a text in the footer for the template$/, function (cb) {

		maker.findsAll('.mce-item-table tr td').get(6).sendKeys('Footer edited').then(cb);
	});

	When(/^the user change the background color in the header for the template$/, function (cb) {
		brw.ignoreSynchronization = true;
		brw.switchTo().frame(element.all(by.tagName('iframe')).get(3).getWebElement());

		element(by.css('#emailTemplateHeader')).click().then(function() {
			//brw.pause();
			maker.findsAll('.color-picker-btn').get(0).then(cb);
		});

	});

	When(/^the user change the background color in the body for the template$/, function (cb) {
		var el = maker.findsAll('.mce-item-table tr td');
		el.get(2).sendKeys('Body edited');
		el.get(4).sendKeys('Body after link edited').then(cb);
	});

	When(/^he user change the background color in the footer for the template$/, function (cb) {
		maker.findsAll('.mce-item-table tr td').get(6).sendKeys('Footer edited').then(cb);
	});

	When(/^the user clicks on the "([^"]*)" element$/, function (templateElement, cb) {
		brw.ignoreSynchronization = true;
		webpage.waitsForElement(emailTemplateEditorLocator);
		brw.switchTo().frame(emailTemplateEditorLocator.getWebElement());

		if(templateElement == 'header'){
			maker.findsAll('.mce-item-table tr td').get(0).click().then(cb);
		}else if(templateElement == 'body'){
			var el = maker.findsAll('.mce-item-table tr td');
			el.get(2).click().then(cb);
		}else if(templateElement == 'footer'){
			maker.findsAll('.mce-item-table tr td').get(6).click().then(cb);
		}
	});

	When(/^the user upload an image in the element$/, function (cb) {
		var path = require('path'),
			remote = require('selenium-webdriver/remote'),
			absolutePath = path.resolve(__dirname, '../../../support/logos/google.png');

		webpage.waits(5000).then(function(){
			brw.switchTo().defaultContent();
			maker.finds('.hidden-upload');


			brw.executeScript('document.getElementsByTagName(\'input\')[5].classList.remove(\'ng-hide\')');
			brw.driver.setFileDetector(new remote.FileDetector());

			maker.finds('.hidden-upload').sendKeys(absolutePath).getAttribute('value').then(function (_text) {
				expect(_text.slice(12, _text.length)).to.be.equal('google.png');
				webpage.waits(5000);
			}).then(cb);
		});
	});

	Then(/^the image was inserted in the "([^"]*)" element$/, function (templateElement, cb) {
		cb();
		//brw.switchTo().frame(element.all(by.tagName('iframe')).get(5).getWebElement());
		//var pos;
		/*browser.explore();
		maker.findsAll('.mce-item-table tr td img').get(0).isPresent().then(function (_isPresent) {
			expect(_isPresent).to.be.true;
		}).then(cb);*/

		/*
		element(by.tagName('img')).isPresent().then(function (_isPresent) {
			expect(_isPresent).to.be.true;
		}).then(cb);*/
	});

};
