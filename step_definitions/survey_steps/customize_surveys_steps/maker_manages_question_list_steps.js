'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user creates a "([^"]*)" question with the title "([^"]*)"$/, function(_typeQuestion, _title, cb) {
		switch (_typeQuestion) {
			case 'multiple_choice':
				user.createsMultiChoiceTypeQuestion(_title);
				user.finds('.spec-multichoice-option-1').sendKeys('Option 1');
				user.finds('.spec-multichoice-option-2').sendKeys('Option 2').then(cb);
				break;
			case 'numeric':
				user.createsNumericTypeQuestion(_title).then(cb);
				break;
			case 'yes no':
			case 'yes-no':
			case 'yes_no':
				user.createsYesOrNotQuestion(_title).then(cb);
				break;
			case 'rating':
				user.createsRatingQuestion(_title).then(cb);
				break;
			case 'short_text':
				user.createsTextFiledQuestion(_title).then(cb);
				break;
			case 'short-text':
				user.createsShortTextFiledQuestion(_title).then(cb);
				break;
			case 'slide_bar':
				user.createsSlideBarQuestion(3, _title).then(cb);
				break;
			case 'expression':
				user.createsExpressionQuestion(_title).then(cb);
				break;
			case 'date':
				user.createsDateQuestion(_title).then(cb);
				break;
			case 'ranking':
				user.createsRankingQuestion(_title);
				user.finds('.spec-ranking-option-1').sendKeys('Option 1');
				user.finds('.spec-ranking-option-2').sendKeys('Option 2').then(cb);
				break;
		}
	});

	When(/^the user adds the question as favorite$/, function(cb) {
		user.findsAll('.spec-dropdown-edit-0').last().click().then(function() {
			return user.finds('.spec-add-question-as-favorite-edit').click();
		}).then(function() {
			return user.getsTextExists('The question has been added to your favorites.');
		}).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	When(/^the user clicks on Add question from favorites$/, function(cb) {
		user.finds('.spec-design-add-state').click();
		user.finds('.spec-design-add-from-favorites').click().then(cb);
	});

	When(/^the user clicks on Add slide from favorites$/, function(cb) {
		user.finds('.spec-btn-add-question-from-favorite').click().then(cb);
	});

	Then(/^the question "([^"]*)" should be displayed in question list modal$/, function(_title, cb) {
		user.getsTextExists(_title).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	Given(/^that the user create a question$/, function(cb) {
		user.createsMultiChoiceTypeQuestion();
		user.finds('.spec-multichoice-option-1').sendKeys('Option 1');
		user.finds('.spec-multichoice-option-2').sendKeys('Option 2').then(cb);
	});

	Given(/^the user makes questions as favorites$/, function(cb) {
		user.findsAll('.spec-dropdown-edit-0').last().click();
		user.finds('.spec-add-question-as-favorite-edit').click().then(cb);
	});

	When(/^the user clicks on Select All$/, function(cb) {
		user.finds('.spec-question-list-check-all-questions-label').click().then(cb);
	});

	When(/^the user clicks on Delete Question$/, function(cb) {
		user.finds('.spec-question-list-delete-questions').click().then(cb);
	});

	Then(/^all the question are deletes$/, function(cb) {
		user.waits(600);
		user.getsTotal('q in fav_questions').then(function(_count) {
			expect(_count).to.be.equal(0);
		}).then(cb);
	});

	When(/^the user clicks on the first question$/, function(cb) {
		user.findsAll('.spec-question-item').first().element(by.css('.spec-fav-question-check')).click().then(cb);
	});

	When(/^the user close the modal$/, function(cb) {
		user.finds('.spec-close-modal').click().then(cb);
	});

	Then(/^the question should be displayed in the design$/, function(cb) {
		user.getsTextExists('Would you recommend our product to others?').then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});
};
