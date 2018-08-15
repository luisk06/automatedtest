'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user creates a "([^"]*)" question with the title "([^"]*)"$/, function(_typeQuestion, _title, cb) {
		switch (_typeQuestion) {
			case 'multiple_choice':
				maker.createsMultiChoiceTypeQuestion(_title);
				maker.finds('.spec-multichoice-option-1').sendKeys('Option 1');
				maker.finds('.spec-multichoice-option-2').sendKeys('Option 2').then(cb);
				break;
			case 'numeric':
				maker.createsNumericTypeQuestion(_title).then(cb);
				break;
			case 'yes no':
			case 'yes-no':
			case 'yes_no':
				maker.createsYesOrNotQuestion(_title).then(cb);
				break;
			case 'rating':
				maker.createsRatingQuestion(_title).then(cb);
				break;
			case 'short_text':
				maker.createsTextFiledQuestion(_title).then(cb);
				break;
			case 'short-text':
				maker.createsShortTextFiledQuestion(_title).then(cb);
				break;
			case 'slide_bar':
				maker.createsSlideBarQuestion(3, _title).then(cb);
				break;
			case 'expression':
				maker.createsExpressionQuestion(_title).then(cb);
				break;
			case 'date':
				maker.createsDateQuestion(_title).then(cb);
				break;
			case 'ranking':
				maker.createsRankingQuestion(_title);
				maker.finds('.spec-ranking-option-1').sendKeys('Option 1');
				maker.finds('.spec-ranking-option-2').sendKeys('Option 2').then(cb);
				break;
		}
	});

	When(/^the user adds the question as favorite$/, function(cb) {
		maker.findsAll('.spec-dropdown-edit-0').last().click().then(function() {
			return maker.finds('.spec-add-question-as-favorite-edit').click();
		}).then(function() {
			return webpage.getsTextExists('The question has been added to your favorites.');
		}).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	When(/^the user clicks on Add question from favorites$/, function(cb) {
		maker.finds('.spec-design-add-state').click();
		maker.finds('.spec-design-add-from-favorites').click().then(cb);
	});

	When(/^the user clicks on Add slide from favorites$/, function(cb) {
		maker.finds('.spec-btn-add-question-from-favorite').click().then(cb);
	});

	Then(/^the question "([^"]*)" should be displayed in question list modal$/, function(_title, cb) {
		webpage.getsTextExists(_title).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	Given(/^that the user create a question$/, function(cb) {
		maker.createsMultiChoiceTypeQuestion();
		maker.finds('.spec-multichoice-option-1').sendKeys('Option 1');
		maker.finds('.spec-multichoice-option-2').sendKeys('Option 2').then(cb);
	});

	Given(/^the user makes questions as favorites$/, function(cb) {
		maker.findsAll('.spec-dropdown-edit-0').last().click();
		maker.finds('.spec-add-question-as-favorite-edit').click().then(cb);
	});

	When(/^the user clicks on Select All$/, function(cb) {
		maker.finds('.spec-question-list-check-all-questions-label').click().then(cb);
	});

	When(/^the user clicks on Delete Question$/, function(cb) {
		maker.finds('.spec-question-list-delete-questions').click().then(cb);
	});

	Then(/^all the question are deletes$/, function(cb) {
		webpage.waits(600);
		maker.getsTotal('q in fav_questions').then(function(_count) {
			expect(_count).to.be.equal(0);
		}).then(cb);
	});

	When(/^the user clicks on the first question$/, function(cb) {
		maker.findsAll('.spec-question-item').first().element(by.css('.spec-fav-question-check')).click().then(cb);
	});

	When(/^the user close the modal$/, function(cb) {
		maker.finds('.spec-close-modal').click().then(cb);
	});

	Then(/^the question should be displayed in the design$/, function(cb) {
		webpage.getsTextExists('Would you recommend our product to others?').then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});
};
