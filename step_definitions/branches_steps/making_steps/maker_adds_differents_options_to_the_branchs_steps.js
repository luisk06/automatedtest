'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a branch in the question number (\d+)$/, function(numberQuestion, cb) {
		var _title = 'Would you recommend our product to others?';
		element.all(by.css('.spec-edit-question-name-any')).last().clear().sendKeys(_title);

		element.all(by.css('.spec-add-option-multichoice-question-0')).last().click();
		element.all(by.css('.spec-multichoice-question-0-option-0')).last().clear().sendKeys('Life matters');
		element.all(by.css('.spec-multichoice-question-0-option-1')).last().clear().sendKeys('Water is great');
		element.all(by.css('.spec-multichoice-question-0-option-2')).last().clear().sendKeys('Money can not be eaten');

		// Questions
		var questionContainer = qrvey.getQuestionContainer(numberQuestion);
		questionContainer.element(by.css('.spec-question-add-branch')).click();

		// Branchs Name
		var branchList = qrvey.getBranchesListFromQuestion(numberQuestion);
		var branch = branchList.get(0);
		branch.element(by.css('.spec-branch-name')).sendKeys('Branch level 1');

		//Select if answer is
		qrvey.selectBranchesIfAnswerIs('Equal', 1, 1, 1);

		//  Selects answers
		branch.element(by.css('.spec-branch-singleselection-options-dropdown span')).click();
		var option = branch.element(by.css('.spec-branch-singleselection-option-0'));
		//browser.executeScript('arguments[0].click()',option)
		option.click().then(function(){
			//  Selects Action
			qrvey.selectBranchesAction();
		});

		//  Open Created Question
		branch.element(by.css('.spec_edit_question_overlay')).click().then(function(){
		// Fill branchs
		// browser.explore();
		// YH7pUtJtERsH45e4mHdg
			branch.all(by.css('.spec-edit-question-name-any')).last().clear().sendKeys(_title + ' 2').then(function(){

				element.all(by.css('.spec-add-option-multichoice-question-0')).last().click();
				element.all(by.css('.spec-multichoice-question-0-option-0')).last().clear().sendKeys('Life matters 2');
				element.all(by.css('.spec-multichoice-question-0-option-1')).last().clear().sendKeys('Water is great 2');
				element.all(by.css('.spec-multichoice-question-0-option-2')).last().clear().sendKeys('Money can not be eaten 2');
			}).then(cb);
		}).then(cb);

	});

	When(/^the user add a new question below the branch and fills it$/, function(cb) {
		user.waits(1000).then(function() {
			scrollToBottom();
			var branchList = qrvey.getBranchesListFromQuestion(1);
			var branch = branchList.get(0);
			branch.all(by.css('.spec-design-add-state')).last().click();
			browser.sleep(2000);
			branch.all(by.css('.spec-design-add-new-question')).last().click();
		});

		user.waits(1000).then(function() {
			// Fill it
			element.all(by.css('.spec-edit-question-name-any')).last().clear().sendKeys('Would you recommend our product to others 3?');

			element.all(by.css('.spec-add-option-multichoice-question-1')).last().click();
			element.all(by.css('.spec-multichoice-question-1-option-0')).last().clear().sendKeys('Life matters 3');
			element.all(by.css('.spec-multichoice-question-1-option-1')).last().clear().sendKeys('Water is great 3');
			element.all(by.css('.spec-multichoice-question-1-option-2')).last().clear().sendKeys('Money can not be eaten 3').then(cb);
		});
	});

	When(/^the user add a new headline below the branch and fills it in a "([^"]*)"$/, function(typeOfQrvey, cb) {
		user.waits(1000).then(function() {
			scrollToBottom();
			element.all(by.css('.spec-design-add-state')).last().click();
			element.all(by.css('.spec-design-add-text')).last().click();
		});

		user.waits(1000).then(function() {
			if (typeOfQrvey == 'progressive') element.all(by.css('.spec_edit_question_overlay')).last().click();

			// Fill it
			element(by.css('app-text textarea')).clear().sendKeys('Would you recommend our product to others in the text?').then(cb);
		});
	});

	When(/^the user clicks on New Text Button$/, function(cb) {
		var _class = '.spec-design-add-text';

		user.waitsFor(_class);
		element(by.css(_class)).click().then(cb);
	});
};
