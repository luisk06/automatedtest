'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var locatorQuestionClosed = by.css('.spec_edit_question_overlay');
	var locatorBranchInput = by.css('.spec-branch-text-input');

	When(/^the user selects the option number (\d+)$/, function(numberAnswer, cb) {
		user.waits(500).then(function() {
			element(by.css('.spec-branch-dropdown-answers')).click();
			element(by.css('.spec-branch-answer-option-' + (numberAnswer - 1))).click().then(cb);
		});
	});

	When(/^the user selects the "([^"]*)" branch option number (\d+) for branch (\d+) level (\d+) from question (\d+)$/, function(branchType, numberAnswer, branchNumber, levelBranch, questionNumber, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber, levelBranch);
		var branch = branchList.get(branchNumber - 1);
		switch (branchType){
			case 'single-selection':
				user.waits(500).then(function() {
					branch.element(by.css('.spec-branch-singleselection-options-dropdown span')).click();
					branch.element(by.css('.spec-branch-singleselection-option-' + (numberAnswer - 1))).click().then(cb);
				});
				break;
			case 'numeric':
				cb();
				break;
			case 'image':
				user.waits(500).then(function() {
					branch.element(by.css('.spec-branch-image-options-dropdown span')).click();
					branch.all(by.css('.spec-branch-image-options-dropdown li')).get(numberAnswer - 1).click().then(cb);
				});
				break;
			case 'yes-no':
				user.waits(500).then(function() {
					branch.element(by.css('.spec-branch-yes-no-options-dropdown span')).click();
					branch.all(by.css('.spec-branch-yes-no-options-dropdown li')).get(numberAnswer - 1).click().then(cb);
				});
				break;
		}

	});

	When(/^the user types "([^"]*)" as text on branch (\d+) level (\d+) from question (\d+)$/, function(branchText, branchNumber, levelBranch, questionNumber, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber, levelBranch);
		var branch = branchList.get(branchNumber - 1);

		branch.element(locatorBranchInput).sendKeys(branchText).then(cb);

	});

	When(/^the webform should be activatable on "([^"]*)"$/, function(typeOfQrvey, cb) {
		var _el = element(by.css('.spec-qrvey-btn-active'));
		//browser.explore();
		webpage.waitsForElement(_el);
		if(typeOfQrvey == 'forms'){
			_el.click().then(function(){
				webpage.waitsFor('.pause');
				element(by.css('.pause')).isPresent().then(function (_isPresent) {
					expect(_isPresent).to.be.true;
				}).then(cb);
			});
		}else{
			_el.click().then(function(){
				element(by.css('.spec-confirm-end-qrvey')).isDisplayed().then(function (_isDisp) {
					expect(_isDisp).to.be.true;
				}).then(cb);
			});
		}
	});

	When(/^the user fill the branchs number (\d+) question number (\d+)$/, function(numberBranchs, numberAnswer, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(1, numberAnswer);
		var branch = branchList.get(numberBranchs - 1);
		branch.element(locatorQuestionClosed).click().then(function(){
			branch.element(by.css('.spec-edit-question-name-any')).sendKeys('Hola').then(cb);
		});
	});

	When(/^the user writes the question and answers for question number (\d+)$/, function(numberQuestion, cb) {
		user.createsMultiChoiceTypeQuestion('Would you recommend our product to others ' + numberQuestion + ' ?').then(function() {
			numberQuestion = numberQuestion - 1;

			element.all(by.css('.spec-add-option-multichoice-question-0')).last().click();

			element.all(by.css('.spec-multichoice-question-0-option-0')).last().clear().sendKeys('Life matters ' + numberQuestion);
			element.all(by.css('.spec-multichoice-question-0-option-1')).last().clear().sendKeys('Water is great ' + numberQuestion);
			element.all(by.css('.spec-multichoice-question-0-option-2')).last().clear().sendKeys('Money can not be eaten ' + numberQuestion).then(cb);
		});
	});

	When(/^the user add a branch for branch level (\d+)$/, function(levelBranch, cb) {
		scrollToBottom();
		var branchList = qrvey.getBranchesListFromQuestion(1, levelBranch);
		branchList.get(0).element(by.css('.spec-question-add-branch')).click().then(cb);
	});

	When(/^the user fill branch name for branch level (\d+) with "([^"]*)"$/, function(levelBranch, branchTitle, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(1, levelBranch);
		branchList.get(0).element(by.css('.spec-branch-name')).sendKeys(branchTitle).then(cb);
	});

	Then(/^all branch should be saved$/, function(cb) {
		cb();
	});
};