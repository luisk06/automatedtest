'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user adds and fills (\d+) options on "([^"]*)" question to question (\d+)$/, function(numberOfOptions, typeOfQuestion, questionNumber, cb) {
		maker.addFillOptionsToQuestionID(numberOfOptions, questionNumber, typeOfQuestion).then(cb);
	});

	When(/^the user adds (\d+) branches to question (\d+)$/, function(numberOfBranchesToAdd, questionNumber, cb) {
		user.finds('.spec-tab-to-desing').click();

		async.eachSeries(gArray(numberOfBranchesToAdd), function(n, next){
			scrollToTop().then(function(){
				var questionContainer = qrvey.getQuestionContainer(questionNumber);

				var el = questionContainer.element(by.css('.spec_edit_question_overlay'));
				webpage.waits(3000);

				el.click().then(function(){
					var addBranch = questionContainer.element(by.css('.spec-question-add-branch'));
					// scrollToTop();
					scrollAxisY('500').then(function(){
						addBranch.click().then(function(){
							webpage.waits(2000);
							scrollToTop().then(next);
						});
					});

				});
			});

		}, function(){
			cb();
		});
	});

	When(/^the user select if-answer option number (\d+) on branch (\d+) from question (\d+)$/, function(optionNumber, branchNumber, questionNumber, cb) {
		var branch = qrvey.getBranchesListFromQuestion(questionNumber).get(branchNumber-1);
		var dropdown = branch.element(by.css('.spec-branch-dropdown-answers'));
		var _opt = optionNumber-1;
		webpage.waits(1800).then(function(){
			dropdown.click().then(function(){
				var option = dropdown.element(by.css('.spec-branch-answer-option-' + (_opt)));
				user.waitForElement(option);
				option.click();
			}).then(cb);
		});
	});

	When(/^the user add another if-answer option on branch (\d+) from question (\d+)$/, function(branchNumber, questionNumber, cb) {
		var branch = qrvey.getBranchesListFromQuestion(questionNumber).get(branchNumber-1);
		webpage.waits(800);
		branch.all(by.css('.spec-branch-add-if-option')).first().click().then(function(){
			webpage.waits(700);
		}).then(cb);
	});


	Then(/^the total of if-answers options on branch (\d+) from question (\d+) should be (\d+) on "([^"]*)" type$/, function(branchNumber, questionNumber, optionsNumber, typeOfQuestion, cb) {
		switch (typeOfQuestion){
			case 'multiple choice':
			case 'yes-no':
				var dropdown = qrvey.getBranchesListFromQuestion(questionNumber).get(branchNumber-1).all(by.css('.spec-branch-dropdown-answers')).first();
				dropdown.click().then(function(){
					expect(dropdown.all(by.css('.options span')).count()).to.eventually.be.equal(parseInt(optionsNumber)).and.notify(function(){
						dropdown.click().then(cb);
					});
				});
				break;
			case 'image':
				expect(qrvey.getBranchesListFromQuestion(questionNumber).get(branchNumber-1).all(by.css('.spec_branch_image_option')).count()).to.eventually.be.equal(parseInt(optionsNumber)).and.notify(cb);
				break;
		}
	});

	Then(/^the user can only add (\d+) if-answers options on branch (\d+) from question (\d+) on "([^"]*)" type$/, function(optionsNumber, branchNumber, questionNumber, typeOfQuestion, cb) {
		var branch = qrvey.getBranchesListFromQuestion(questionNumber).get(branchNumber-1);
		switch (typeOfQuestion){
			case 'multiple choice':
				var firstDropdown = branch.all(by.css('.spec-branch-dropdown-answers')).first();
				firstDropdown.all(by.css('.options span')).each(function(item, i) {
					webpage.waits(800);
					var dropdown = branch.all(by.css('.spec-branch-dropdown-answers')).get(i);
					dropdown.click().then(function(){
						var _opt = dropdown.element(by.css('.spec-branch-answer-option-'+i));
						user.waitForElement(_opt);
						scrollToBottom();
						webpage.waits(1000);
						_opt.click().then(function(){
							webpage.waits(450);
							branch.all(by.css('.spec-branch-add-if-option')).get(i).click().then(function(){
								webpage.waits(450);
								logger.log(i);
							});
						});
					});
				}).then(function(){
					branch.all(by.css('.spec-branch-add-if-option')).each(function(element, index){
						expect(hasClass(element, 'unactive'), 'branch if-answer option n: ' +index+'is not unactive').to.eventually.be.true;
					}).then(function(){
						expect(branch.all(by.css('.spec-branch-dropdown-answers')).count()).to.eventually.be.equal(parseInt(optionsNumber)).and.notify(cb);
					});
				});

				break;
			case 'image':
				cb();
				break;
			case 'yes-no':
				branch.element(by.css('.spec-branch-add-if-option')).isPresent().then(function(_isPresent){
					expect(_isPresent).to.be.false;
				}).then(cb);
				break;
		}
	});

	Then(/^the add branch link on question (\d+) should be disabled$/, function(questionNumber, cb) {
		var questionContainer = qrvey.getQuestionContainer(questionNumber);
		expect(hasClass(questionContainer.element(by.css('.spec-question-add-branch')), 'disable')).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the total of branches on question (\d+) should be (\d+)$/, function(questionNumber, totalBranches, cb) {
		expect(qrvey.getBranchesListFromQuestion(questionNumber).count()).to.eventually.be.equal(parseInt(totalBranches)).and.notify(cb);
	});

	Then(/^the option (\d+) on if-answer dropdown (\d+) on branch (\d+) from question (\d+) should be disabled$/, function(optNumber, dropDownNumber, branchNumber, questionNumber, cb) {
		var branch = qrvey.getBranchesListFromQuestion(questionNumber).get(branchNumber-1);
		var dropdown = branch.all(by.css('.spec-branch-dropdown-answers')).get(dropDownNumber-1);
		dropdown.click().then(function(){
			dropdown.element(by.css('.spec-branch-answer-option-' + (optNumber-1))).click().then(function(){
				expect(dropdown.element(by.css('span span')).getText()).to.eventually.be.equal('Select an answer').and.notify(cb);
			});
		}).then(cb);
	});
};