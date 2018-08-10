'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user take a photo to upload$/, function (cb) {
		user.finds('.takePhotoBtn').click();
		brw.sleep(1000);
		user.finds('.take-button').click();
		user.finds('.take-button.confirm').click();
		brw.sleep(1000);
		cb();
	});
};