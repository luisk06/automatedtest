'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var logoUrl = null;

	Then(/^the user loads the "([^"]*)" file that has "([^"]*)" than (\d+) kb$/, function(type, size, kb, cb) {
		var fileToUpload = null,
			absolutePath = null,
			_name = null,
			_rote = '../../../support/logos/',
			path = require('path'),
			remote = require('selenium-webdriver/remote');

		brw.driver.setFileDetector(new remote.FileDetector());

		_name = ((type !== 'gif') ? 'google' : 'logo') + ((size == 'less') ? '' : '_' + kb + 'kb') + '.' + type;
		fileToUpload = _rote + _name;
		absolutePath = path.resolve(__dirname, fileToUpload);

		logger.log('absolutePath', absolutePath);

		logoUrl = '';
		user.finds('.spec_customize_field_updload').clear().sendKeys(absolutePath).getAttribute('value').then(function(_text) {
			expect(_text.slice(12, _text.lenght)).to.be.equal(_name);
		}).then(cb);
	});

	Then(/^the new logo should be displayed$/, function(cb) {
		var el = '.spec_customize_custom_logo';

		webpage.waitsFor(el).then(function() {
			expect(user.finds(el).getAttribute('src')).to.eventually.not.be.eql(logoUrl).and.notify(cb);
		});
	});

	Then(/^the "([^"]*)" option should be displayed$/, function(arg1, cb) {
		// var el = '.spec-customize-' + arg1 + '-logo';

		// webpage.waitsFor(el).then(function() {
		//     expect(webpage.isDisplayed(el)).to.eventually.be.true.and.notify(cb);
		// });
		cb();
	});

	Then(/^the "([^"]*)" notification should be displayed$/, function(arg1, cb) {
		var el = '.alert-wrapper.' + arg1;

		// webpage.waitsFor(el).then(function() {
		expect(webpage.isDisplayed(el)).to.eventually.be.true.and.notify(cb);
		// });
	});
};
