'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user archive a question$/, function(cb) {
		element(by.css('.spec-dropdown-1')).click();
		element.all(by.css('.more-drop .options span')).get(10).click();
		element(by.css('.spec-delete-qrvey-confirm')).click().then(cb);
	});

	When(/^the user try to archive a question$/, function(cb) {
		element.all(by.css('.spec_edit_question_overlay')).get(0).click().then(function(){
			element(by.css('.spec-dropdown-edit-0')).click().then(function(){
				element.all(by.css('.more-drop span')).count().then(function(_count){
					expect(_count).to.be.equal(8);
				}).then(cb);
			});
		});
	});

	When(/^the user unarchive the question$/, function(cb) {
		element(by.css('.archived-fields')).click().then(function(){
			element(by.css('.spec-question-list-check-all-questions-label')).click().then(function(){
				element.all(by.css('.modal-footer .button')).get(0).click().then(cb);
			});
		});
	});

	Then(/^the question was unarchived$/, function(cb) {
		element.all(by.css('.spec_edit_question_overlay')).count().then(function(_count) {
			expect(_count).to.be.equal(3);
		}).then(cb);
	});

	Then(/^the question is archived$/, function(cb) {
		element.all(by.css('.spec_edit_question_overlay')).count().then(function(_count) {
			expect(_count).to.be.equal(2);
		}).then(cb);
	});

	Then(/^the question is not archived$/, function(cb) {
		element.all(by.css('.spec_edit_question_overlay')).count().then(function(_count) {
			expect(_count).to.be.equal(1);
		}).then(cb);
	});
};