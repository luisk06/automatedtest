'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var locatorRatingDropdown = by.css('.spec-branch-rating-options-dropdown');
	var locatorRatingFromDropDown = by.css('.spec-branch-rating-options-dropdown-between-from');
	var locatorRatingMaxDropwDown = by.css('.spec-branch-rating-options-dropdown-between-max');
	var locatorDateDropdown = by.css('.spec-branch-date-options-input');
	var locatorDateDropdownMax = by.css('.spec-branch-date-options-input-max');

	When(/^the user creates a question at end$/, function (cb) {
		qrvey.addQuestionLast(cb);
	});

	When(/^the user selects "([^"]*)" question type for question (\d+)$/, function (typeOfQuestion, questionNumber, cb) {
		var _type = qrvey.getQuestionType(typeOfQuestion);
		user.waits(1500);

		qrvey.questionTypeFromId(questionNumber, _type).then(function () {
			if (_type == 'slider bar') {
				expect(hasClass(element(by.id('spec-slidebar-number-option-3')), 'active')).to.eventually.be.true;
				expect(hasClass(element(by.id('spec-slidebar-number-option-5')), 'active')).to.eventually.not.be.true;
				expect(hasClass(element(by.id('spec-slidebar-number-option-7')), 'active')).to.eventually.not.be.true;
				expect(hasClass(element(by.id('spec-slidebar-number-option-9')), 'active')).to.eventually.not.be.true;
			}
		}).then(cb);
	});

	When(/^the user fill "([^"]*)" question options from question (\d+)$/, function (typeOfQuestion, questionNumber, cb) {
		user.waits(500).then(function () {
			maker.fillQuestionByTypeAndID(questionNumber, typeOfQuestion).then(cb);
		});
	});

	When(/^the user click on question (\d+)$/, function (questionNumber, cb) {
		scrollToTop();

		var questionContainer = qrvey.getQuestionContainer(questionNumber);
		questionContainer.element(by.css('.spec_edit_question_overlay')).click().then(cb);
	});

	When(/^the user add a branch for question (\d+)$/, function (questionNumber, cb) {
		var questionContainer = qrvey.getQuestionContainer(questionNumber);
		questionContainer.element(by.css('.spec-question-add-branch')).click().then(cb);
	});

	When(/^the user fill branch name (\d+) for question (\d+) with "([^"]*)"$/, function (branchNumber, questionNumber, branchTitle, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber);
		branchList.get(branchNumber - 1).element(by.css('.spec-branch-name')).clear();
		branchList.get(branchNumber - 1).element(by.css('.spec-branch-name')).sendKeys(branchTitle).then(cb);
	});

	When(/^the user select "([^"]*)" action for branch (\d+) level (\d+) on question (\d+)$/, function (action, branchNumber, levelNumber, questionNumber, cb) {
		qrvey.selectBranchesAction(action, questionNumber, branchNumber, levelNumber).then(function () {
			var branchList = qrvey.getBranchesListFromQuestion(questionNumber, levelNumber);
			var branch = branchList.get(branchNumber - 1);
			user.waits(3000);
			if (action == 'end'){
				user.waits(1000).then(function () {
					branch.element(by.css('.spec-branch-dropdown')).click().then(function () {
						branch.element(by.css('.spec-branch-jump-end')).click().then(cb);
					});
				});
			} else if (action == 'follow branch'){
				user.waits(1000).then(function () {
					branch.element(by.css('.spec-branch-dropdown')).click().then(function () {
						branch.element(by.css('.spec-branch-action-follow')).click().then(cb);
					});
				});
			} else if (action == 'follow branch then end') {
				user.waits(1000).then(function () {
					branch.element(by.css('.spec-branch-dropdown')).click().then(function () {
						branch.element(by.css('.spec-branch-action-follow-end')).click().then(cb);
					});
				});
			}
		}).then(cb);
	});

	When(/^the user selects "([^"]*)" action for branch (\d+) level (\d+) on question (\d+)$/, function (action, branchNumber, levelNumber, questionNumber, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber, levelNumber);
		var branch = branchList.get(branchNumber - 1);
		user.waits(2000);
		browser.actions().mouseMove(branch.element(by.css('.spec-branch-dropdown')), {x:48,y:12}).click().perform().then(function () {
			branch.element(by.css('.spec-branch-action-' + action)).click().then(cb);
		});
	});

	When(/^the user choses rating options on for "([^"]*)" option on branch (\d+) level (\d+) from question (\d+)$/, function (option, branchNumber, levelNumber, questionNumber, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber, levelNumber);
		var branch = branchList.get(branchNumber - 1);
		user.waits(2000);
		if(option == 'Between, inclusive'){
			var ratingFromDropdown = branch.element(locatorRatingFromDropDown);
			ratingFromDropdown.click().then(function(){
				ratingFromDropdown.all(by.tagName('li')).get(0).click();
			}).then(function(){
				var ratingMaxDropdown = branch.element(locatorRatingMaxDropwDown);
				ratingMaxDropdown.click().then(function(){
					ratingMaxDropdown.all(by.tagName('li')).get(3).click();
				});
			}).then(cb);

		}else{
			var ratingDropdown = branch.element(locatorRatingDropdown);
			ratingDropdown.click().then(function(){
				ratingDropdown.all(by.tagName('li')).get(1).click();
			}).then(cb);
		}
	});

	When(/^the user select a date for "([^"]*)" option on branch (\d+) level (\d+) from question (\d+)$/, function (option, branchNumber, levelNumber, questionNumber, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber, levelNumber);
		var branch = branchList.get(branchNumber - 1);
		user.waits(2000);
		var dateDropdownMin = branch.element(locatorDateDropdown);
		if(option == 'Between, inclusive'){

			dateDropdownMin.sendKeys('6/6/2013').then(function(){
				var dateDropdownMax = branch.element(locatorDateDropdownMax);
				dateDropdownMax.sendKeys('6/6/2018');
			}).then(cb);

		}else{
			dateDropdownMin.sendKeys('6/6/2013').then(cb);
		}
	});



	When(/^the user select "([^"]*)" as if-answer-is option for branch (\d+) level (\d+) on question (\d+)$/, function (ifansweris, branchNumber, levelNumber, questionNumber, cb) {
		qrvey.selectBranchesIfAnswerIs(ifansweris, questionNumber, branchNumber, levelNumber).then(cb);
	});

	When(/^the user selects "([^"]*)" as if-answer-is option for branch (\d+) level (\d+) on question (\d+)$/, function (ifansweris, branchNumber, levelNumber, questionNumber, cb) {
		var locatorBranchIfAnswerIsDropdown = '.spec-branch-ifansweris-dropdown';
		var branchDropdown = qrvey.getBranchesListFromQuestion(questionNumber, levelNumber).get(branchNumber-1).element(by.css(locatorBranchIfAnswerIsDropdown));
		browser.actions().mouseMove(branchDropdown, {x:48,y:12}).click().perform().then(function(){
			branchDropdown.element(by.xpath(".//ul/li[normalize-space(text()) = '" + ifansweris + "']")).click().then(cb); // eslint-disable-line
		});
	});

	When(/^the user selects "([^"]*)" option (\d+) on branch (\d+) from question (\d+)$/, function (type, optionNumber, branchNumber, questionNumber, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber);
		var branch = branchList.get(branchNumber - 1);

		if (type == 'jump to'){
			user.waits(1000).then(function () {
				branch.element(by.css('.spec-branch-dropdown')).click().then(function () {
					branch.element(by.css('.spec-branch-jump-option-' + optionNumber)).click().then(cb);
				});
			});
		} else if (type == 'follow branch'){
			user.waits(1000).then(function () {
				branch.element(by.css('.spec-branch-dropdown')).click().then(function () {
					branch.element(by.css('.spec-branch-action-follow')).click().then(cb);
				});
			});
		} else if (type == 'follow branch then end') {
			user.waits(1000).then(function () {
				branch.element(by.css('.spec-branch-dropdown')).click().then(function () {
					branch.element(by.css('.spec-branch-action-follow-end')).click().then(cb);
				});
			});
		}
	});

	When(/^the user selects jump to end on branch (\d+) from question (\d+)$/, function (branchNumber, questionNumber, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber);
		var branch = branchList.get(branchNumber - 1);
		user.waits(1000).then(function () {
			return branch.element(by.css('.spec-branch-dropdown')).click();
		}).then(function () {
			branch.element(by.css('.spec-branch-jump-end')).click().then(cb);
		});
	});

	When(/^the user selects if answer is (\d+) on branch (\d+) from question (\d+) with type "([^"]*)"$/, function (optionNumber, branchNumber, questionNumber, typeOfQuestion, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber);
		var branch = branchList.get(branchNumber - 1);
		if (typeOfQuestion == 'image') {
			branch.element(by.css('.spec-branch-image-option-' + optionNumber)).click().then(cb);
		} else {
			branch.element(by.css('.spec-branch-ifansweris-dropdown')).click().then(function () {
				branch.element.all(by.css('.spec-branch-ifansweris-dropdown .options span')).get(optionNumber).click().then(cb);
			});
		}
	});

	Then(/^the question (\d+) should be saved$/, function (questionNumber, cb) {
		var _questionError = by.css('.spec-question-container-' + questionNumber + ' .title-error');
		expect(element(_questionError).isPresent()).to.eventually.be.false.and.notify(cb);
	});

	Then(/^the jump-to branch (\d+) from question (\d+) should be saved$/, function (branchNumber, questionNumber, cb) {
		var branchList = qrvey.getBranchesListFromQuestion(questionNumber);
		var branch = branchList.get(branchNumber - 1);
		expect(hasClass(branch.element(by.css('.spec-branch-created')), 'error')).to.eventually.be.false.and.notify(cb);
	});

	Then(/^the user shoud be able to move to share tab$/, function (cb) {
		var el = '.spec-tab-to-share';
		user.waits(3000);
		element(by.css(el)).click().then(function () {
			var has_Class = hasClass(element(by.css(el)), 'active');
			expect(has_Class).to.eventually.be.true.and.notify(cb);
		});
	});
};