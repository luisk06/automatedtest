'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on the merge option$/, function (cb) {
		maker.finds('.spec-touch-menu-qrvey').click();
		maker.finds('.spec-touch-menu-qrvey-merge-option').click().then(cb);
	});

	When(/^the user selects the origin type$/, function (cb) {
		maker.finds('.dropdown.select-with-filter span').click();
		maker.findsAll('.options .scrollerOptions span').get(0).click().then(cb);
	});

	When(/^the user selects the next forms$/, function (cb) {
		maker.findsAll('.dropdown.select-with-filter span').get(2).click();
		maker.findsAll('.options .scrollerOptions span').get(1).click().then(cb);
	});

	When(/^the user write the new name to the merged forms$/, function (cb) {
		var newName = rand.getText();
		maker.findsAll('.filterQuery').get(2).sendKeys(newName).then(cb);
	});

	When(/^the user clicks on the next button to merge$/, function (cb) {
		maker.finds('.modal-footer .button.enable').click().then(cb);
	});

	When(/^the user clicks on merge button$/, function (cb) {
		maker.finds('.modal-footer .button.enable').click().then(cb);
	});

	When(/^the user clicks on continue button$/, function (cb) {
		maker.findsAll('.modal-footer .button.enable').get(1).click().then(cb);
	});

	When(/^the user opens the webform merged$/, function (cb) {
		maker.finds('.spec-qrvey-title-link.qrvey-title-desktop').click().then(cb);
	});

	Then(/^the (\d+) webforms are displayed on the dashboard$/, function (num, cb) {
		// brw.enterRepl();
		maker.findsAllRepeater('qrvey in allQrveys | filter: dataForms').count().then(function(_count){
			expect(_count).to.be.equal(+num);
		}).then(cb);
	});
};