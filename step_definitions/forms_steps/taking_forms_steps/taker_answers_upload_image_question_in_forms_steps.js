'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user take a photo to upload$/, function (cb) {
		maker.finds('.takePhotoBtn').click();
		brw.sleep(1000);
		maker.finds('.take-button').click();
		maker.finds('.take-button.confirm').click();
		brw.sleep(1000);
		cb();
	});
};