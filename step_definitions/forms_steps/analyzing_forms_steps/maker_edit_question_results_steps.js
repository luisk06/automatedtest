'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var firstAnswer = '',
		newAnswer = '';

	When(/^the user selects the first answer to edit$/, function(cb) {
		var el = user.findsAll('.dx-row.dx-data-row.dx-row-lines.dx-column-lines').get(0);

		el.getText().then(function (res) {
			firstAnswer = res;
		});

		el.click().then(cb);
	});

	When(/^the user select the first column to filter$/, function (cb) {
		element.all(by.css('.dx-datagrid-text-content')).get(0).click().then(cb);
	});

	When(/^the user edits the questionnaire question$/, function(cb) {
		user.waits(5000).then(function() {
			brw.ignoreSynchronization = true;
			brw.switchTo().frame(element(by.css('#update-qrvey-iframe')).getWebElement());
			element(by.css('.edit-answered')).click().then(cb);
		});
	});

	When(/^the user edits the form question$/, function(cb) {
		user.waits(5000).then(function() {
			brw.ignoreSynchronization = true;
			brw.switchTo().frame(element(by.css('#update-qrvey-iframe')).getWebElement()).then(cb);
		});
	});

	When(/^the user clicks the Update button$/, function(cb) {
		user.waits(5000).then(function() {
			brw.switchTo().defaultContent();
			element(by.css('.spec_apply_filter_button')).click().then(cb);
		});
	});

	Then(/^the first form result is updated$/, function(cb) {
		user.waits(8000).then(function() {
			user.findsAll('.dx-row.dx-data-row.dx-row-lines.dx-column-lines').get(0).getText().then(function(_newAnswer) {
				newAnswer = _newAnswer;
				logger.log('NEWANSWER', newAnswer);
				expect(newAnswer).to.not.be.equal(firstAnswer);
			}).then(cb);
		});
	});

	Then(/^the first form result is not changed$/, function(cb) {
		user.findsAll('.dx-row.dx-data-row.dx-row-lines.dx-column-lines').get(0).getText().then(function(_newAnswer) {
			newAnswer = _newAnswer;
			logger.log('NEWANSWER2', newAnswer);
			expect(newAnswer).to.be.equal(firstAnswer);
		}).then(cb);
	});
};