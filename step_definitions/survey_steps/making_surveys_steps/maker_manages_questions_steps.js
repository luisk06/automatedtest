'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the qrvey has less than (\d+) questions$/, function(size, cb) {
		async.eachSeries(gArray(+size - 2), function(n, next) {
			qrvey.addQuestion().then(function() {
				if (n == (+size - 2)) cb();
				else next();
			});
		});
	});

	When(/^the user clicks Add Questions$/, function(cb) {
		qrvey.addQuestion().then(cb);
	});

	Then(/^new question charts should be displayed$/, function(cb) {
		cb();
	});

	Given(/^that the qrvey has (\d+) questions$/, function(size, cb) {
		async.eachSeries(gArray(+size - 1), function(n, next) {
			qrvey.addQuestion().then(function() {
				if (n == (+size - 1)) cb();
				else next();
			});
		});
	});

	Then(/^the Go to Share button should appear$/, function(cb) {
		expect(qrvey.checkExistance('go_share_button')).to.eventually.be.true.and.notify(cb);
	});

	When(/^the user removes questions$/, function(cb) {
		element(by.css('.spec-question-created-5')).click().then(function(){
			element(by.css('.spec-dropdown-edit-4')).click().then(function() {
				element(by.css('.remove-question-4')).click().then(cb);
			});
		});
	});

	Then(/^the Add Questions button should appear$/, function(cb) {
		cb();
	});

	Given(/^that the user counted the amount of webform$/, function(cb) {
		element.all(by.repeater('qrvey in allQrveys | filter: dataForms')).count().then(function(amount){
			expect(amount).to.be.equal(1);
		}).then(cb);
	});

	When(/^the user clicks on the webform menu$/, function(cb) {
		element(by.css('.spec-touch-menu-qrvey')).click().then(cb);
	});
};