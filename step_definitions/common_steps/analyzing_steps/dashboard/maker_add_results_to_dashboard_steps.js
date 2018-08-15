'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user add the chart to dashboard$/, function (cb) {
		user.finds('.spec-download-drop').click();
		user.finds('.spec-add-to-dashboard').click().then(cb);
	});

	When(/^the user go to the analytic dashboard$/, function (cb) {
		user.finds('.spec_favorites_button').click().then(cb);
	});

	When(/^the user clicks on the filter button$/, function (cb) {
		user.waits(1500);

		scrollToBottom().then(function(){
			return element(by.css('.spec-download-drop span')).click();
		}).then(function () {
			var _el = element(by.css('.spec_filter_button_1'));
			scrollIntoElement(_el);
			return _el.click();
		}).then(function () {
			user.waits(600).then(function () {
				cb(); // Should be thus
			});
		});
	});

	When(/^the user clicks on the charts filter button$/, function (cb) {
		user.waits(1500);
		element(by.css('.optionsMenu.filterDropAN')).click().then(cb);
	});

	When(/^the user clicks on the forms filter button$/, function (cb) {
		element(by.css('.spec-form-filter')).click().then(cb);
	});

	Then(/^the chart of "([^"]*)" should appear in the dashboard$/, function (typeOfQuestion, cb) {
		if (typeOfQuestion == 'rating')  user.finds('.slimScrollDiv').click().then(cb);
		else user.finds('.spec-chart-analytiq-dashboard').click().then(cb);
	});

	Then(/^the panel should mention filter applied$/, function (cb) {
		element(by.css('analytiq-dashboard-content mark')).getText().then(function(_res){
			expect(_res).to.be.equal('Filters applied');
		}).then(cb);
	});

	Then(/^the chart can be deleted$/, function (cb) {
		maker.deleteAnDashboard(appID).then(cb);
	});
};