'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var locatorUploadButton = by.css('a[ng-click="uploadFillableTemplate();"]');
	var locatorFileListItem = by.css('tr[ng-repeat="file in userUploadedFiles track by $index"]');

	When(/^the user opened the manager files$/, function (cb) {
		user.findsLinkText('Add / Manage Files').click().then(cb);
	});

	Then(/^the user should stay on the manager files url$/, function (cb) {
		expect(webpage.getCurrentUrl()).to.eventually.contain('fillable-templates').and.notify(cb);
	});

	Then(/^should not have pdf on the list$/, function (cb) {
		user.finds('.empty-files span').getText().then(function(_text){
			expect(_text).to.be.equal('No files uploaded');
		}).then(cb);
	});

	When(/^the user clicks upload file button$/, function (cb) {
		element(locatorUploadButton).click().then(cb);
	});

	When(/^the user uploads a pdf file$/, function (cb) {
		var path = require('path'),
			remote = require('selenium-webdriver/remote'),
			absolutePath = path.resolve(__dirname, '../../support/filliablePdf/oopdfformexample.pdf');

		brw.driver.setFileDetector(new remote.FileDetector());

		var _el = element(by.css('input[type=file]'));
		logger.log(absolutePath);

		_el.sendKeys(absolutePath);

		maker.waitForElement(element(locatorUploadButton)).then(function(){
			cb();
		});
				
	});

	

	Then(/^a file should appear on the list$/, function (cb) {
		var _ele = element(locatorFileListItem);
		_ele.isDisplayed().then(function(_is){
			expect(_is).to.be.true;
		}).then(cb);
	});
};
