'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user writes the title of the question$/, function(cb) {
		var _title = 'Image type question',
			_el = user.finds('.spec-edit-question-name-any');

		_el.clear().sendKeys(_title).then(cb);
	});

	When(/^the user adds all images possible to question since "([^"]*)"$/, function(typeOfInput, cb) {
		maker.createsImageQuestion({'typeOfInput': typeOfInput}).then(cb);
	});

	When(/^the user adds all title possible to images$/, function(cb) {
		maker.addImageTitles().then(cb);
	});

	When(/^the user adds (\d+) images to question$/, function(arg1, cb) {
		cb();
	});

	When(/^the user removes all images possible in the question$/, function(cb) {
		cb();
	});

	When(/^the user clicks on "([^"]*)" option$/, function(arg1, cb) {
		cb();
	});

	Then(/^the notification should be displayed$/, function(cb) {
		cb();
	});

	When(/^the user adds all paths possible in each image$/, function(cb) {
		cb();
	});
};
