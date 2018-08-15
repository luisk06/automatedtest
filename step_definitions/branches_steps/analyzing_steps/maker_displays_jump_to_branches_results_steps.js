'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has a webform app with a "([^"]*)" with a "([^"]*)" branch with (\d+) responses$/, function(typeOfQrvey, typeOfBranch, num, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test ' + typeOfQrvey + ' Branches').then(function(){
				as.createAnswersForBranchs(_userId, typeOfQrvey, typeOfBranch, num).then(function(data) {
					logger.log('qrveys.data', data);
					webpage.waits(5000);
				}).then(cb);
			});
		});
	});

	Then(/^the rows for question (\d+) should be empty$/, function(cellNumber, cb) {
		element.all(by.css('.spec-form-cell-' + (cellNumber + 2))).each(function(cell) {
			expect(cell.getText()).to.eventually.be.equal('');
		}).then(cb);
	});

	Then(/^the rows for question (\d+) should not be empty$/, function(cellNumber, cb) {
		element.all(by.css('.spec-form-cell-' + (cellNumber + 2))).each(function(cell) {
			expect(cell.getText()).to.eventually.not.be.equal('');
		}).then(cb);
	});

	Then(/^a branch button should not be displayed on panel (\d+)$/, function(panelNumber, cb) {
		var panel = element(by.css('.spec-panel-container-' + (panelNumber - 1)));
		expect(panel.element(by.css('.spec-branch-button')).isDisplayed()).to.eventually.be.false.and.notify(cb);
	});

	Then(/^there should be (\d+) responses on panel (\d+)$/, function(numResponses, panelNumber, cb) {
		var panel = element(by.css('.spec-panel-container-' + (panelNumber - 1)));
		panel.element(by.css('.spec-analyzing-answered')).getText().then(function(_text) {
			expect(_text).to.be.equal(numResponses);
		}).then(cb);
	});
};