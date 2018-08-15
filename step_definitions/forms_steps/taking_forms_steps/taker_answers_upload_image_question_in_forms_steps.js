'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user take a photo to upload$/, function (cb) {
		taker.finds('.takePhotoBtn').click();
		brw.sleep(1000);
		taker.finds('.take-button').click();
		taker.finds('.take-button.confirm').click();
		brw.sleep(1000);
		cb();
	});
};