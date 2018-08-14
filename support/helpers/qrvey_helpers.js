'use strict';

var Qrveyhelpers = function() {
	var locatorQuestionContainer = '.spec-question-container-';
	var locatorBranchActionDropdown = '.spec-branch-action-dropdown';
	var locatorBranchIfAnswerIsDropdown = '.spec-branch-ifansweris-dropdown';
	var _this = this;
	this.qrveyQuestionName = null;
	this.qrveyUrl = null;

	this.setQrveyQuestionName = function(name) {
		this.qrveyQuestionName = name;
	};

	this.setQrveyUrl = function(val) {
		this.qrveyUrl = val;
	};

	this.getQrveyUrl = function() {
		return this.qrveyUrl;
	};

	this.getQrveyQuestionName = function() {
		return this.qrveyQuestionName;
	};

	this.getQuestionType = function(typeOfQuestion) {
		var _type = '';

		switch (typeOfQuestion) {
			case 'multiple choice':
				_type = 'spec_mc_qt';
				break;
			case 'image':
				_type = 'spec_img_qt';
				break;
			case 'expression':
				_type = 'spec_ex_qt';
				break;
			case 'numeric':
				_type = 'spec_nu_qt';
				break;
			case 'ranking':
				_type = 'spec_rn_qt';
				break;
			case 'rating':
				_type = 'spec_rt_qt';
				break;
			case 'short text':
				_type = 'spec_tf_qt';
				break;
			case 'slider bar':
			case 'slide bar':
				_type = 'spec_sl_qt';
				break;
			case 'yes-no':
				_type = 'spec_yn_qt';
				break;
			case 'date':
				_type = 'spec_da_qt';
				break;
			case 'nps':
				_type = 'spec_nps_qt';
				break;
			case 'long-text':
				_type = 'spec_lt_qt';
				break;
			case 'email':
				_type = 'spec_em_qt';
				break;
			case 'address':
				_type = 'spec_ad_qt';
				break;
			case 'phone':
				_type = 'spec_ph_qt';
				break;
			case 'name':
				_type = 'spec_na_qt';
				break;
			case 'us-address':
				_type = 'spec_ua_qt';
				break;
			default:
				throw new Error('The type of question is undefined when the user try to select ' + typeOfQuestion + ' in the dropdown menu');
		}

		return _type;
	};

	this.createQrvey = function() {
		navigate.clicksButton('.spec_dashboard_create_new_button');
		navigate.clicksButton('.spec_dropdown_create_survey_button');
		// navigate.clicksButton(_el);
		// navigate.sendKeys('.spec-input-new-survey-name', name);
		// navigate.sendKeys('.spec-input-new-survey-description', description);;
		return navigate.clicksButton('.spec-button-create-survey');
	};

	this.fillQuestionTittleFromID = function(number, title) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
	};

	this.fillQuestionDefaultFromID = function(number) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		return questionContainer.element(by.css('.spec-edit-question-name-any')).click();
	};

	this.questionType = function(type) {
		scrollToTop();
		element(by.css('#questionType_dropdown')).click();
		return element(by.css('#' + type)).click();
	};

	this.questionTypeFromId = function(number, type) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		var el = questionContainer.element(by.id('questionType_dropdown'));

		scrollIntoElement(el);

		return el.click().then(function() {
			return questionContainer.element(by.css('#' + type)).click();
		});
	};

	this.numberOfQuestions = function() {
		return null;
	};

	this.addQuestion = function() {
		navigate.clicksButton('.spec-design-add-state');
		return navigate.clicksButton('.spec-design-add-new-question');
	};

	this.addQuestionLast = function(_callback) {
		return element(by.css('.spec-design-add-state.withThankYP a')).click().then(function() {
			return navigate.clicksButton('.spec-design-add-new-question').then(_callback);
		});
	};

	this.getBranchesListFromQuestion = function(questionNumber, branchLevelNumber) {
		branchLevelNumber = (typeof branchLevelNumber !== 'undefined') ? branchLevelNumber : 1;
		console.log('level ', branchLevelNumber);

		return element.all(by.css('.spec-question-container-' + questionNumber + ' .spec-branches-container app-question-branch.spec-branch-level-' + branchLevelNumber));
	};

	this.createsExpressionQuestion = function(_callback, _title) {
		this.fillExpressionQuestionTitle(_title);
		this.fillExpressionQuestionAnswers().then(_callback);
	};

	this.fillExpressionQuestionTitle = function(title) {
		return element(by.css('.spec-edit-question-name-any')).sendKeys(title);
	};

	this.getQuestionContainer = function(number) {
		return element(by.css('.spec-question-container-' + number));
	};

	this.fillQuestionNameAndDescription = function(name, desc) {
		navigate.sendKeys('.spec-input-new-survey-name', name);
		return navigate.sendKeys('.spec-input-new-survey-description', desc);
	};

	this.fillMultipleChoiceQuestionFromId = function(number, title) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(function() {
			return questionContainer.element(by.css('.spec-multichoice-option-1')).sendKeys('Option 1').then(function() {
				return questionContainer.element(by.css('.spec-multichoice-option-2')).sendKeys('Option 2');
			});
		});
	};

	this.addfillMultipleChoiceOptionsFromId = function(numberOfOptions, number, _title) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		numberOfOptions = (typeof numberOfOptions !== 'undefined') ? numberOfOptions : 2; // By default 2 options to create
		numberOfOptions = (numberOfOptions >= 2) ? numberOfOptions : 2; // Min number to create
		numberOfOptions = (numberOfOptions <= 15) ? numberOfOptions : 15;

		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(_title).then(function() {
			var index = 0;
			for (var i = 0; i < numberOfOptions - 2; i++) {
				questionContainer.element(by.css('.spec-add-option-multichoice-question-0')).click().then(function() {
					brw.waitForAngular();
				});
			}

			for (var j = 0; j < numberOfOptions; j++) {
				index = j + 1;
				questionContainer.element(by.css('.spec-multichoice-option-' + (index))).sendKeys('Option ' + index).then(function() {
					brw.waitForAngular();
				});
			}

		});
	};

	this.addUrlToImageModal = function() {
		var _el = user.finds('.spec-design-modal-image-url'),
			_url = 'https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png';

		return _el.clear().sendKeys(_url).then(function() {
			_el.getAttribute('value').then(function(_value) {
				expect(_value).to.be.equal(_url);
			});
		}).then(function() {
			user.finds('.spec-design-modal-done-button').click();
		});
	};

	this.addfillImageOptionsFromId = function(numberOfOptions, number, _title) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		numberOfOptions = (typeof numberOfOptions !== 'undefined') ? numberOfOptions : 2; // By default 2 options to create
		numberOfOptions = (numberOfOptions >= 2) ? numberOfOptions : 2; // Min number to create
		numberOfOptions = (numberOfOptions <= 15) ? numberOfOptions : 15;

		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(_title).then(function() {
			for (var i = 0; i < numberOfOptions - 2; i++) {
				questionContainer.all(by.css('.spec-add-option-image-question')).last().click().then(function() {
					brw.waitForAngular();
				});
			}
		}).then(function() {
			questionContainer.all(by.repeater('answer in question.answers')).each(function(item, index) {
				item.element(by.css('.spec-design-image-title')).sendKeys('Option ' + (index + 1)).then(function() {
					user.waits(890);
					item.element(by.css('.spec-image-upload-option-url')).click().then(function() {
						_this.addUrlToImageModal();
					});
				});
			});
		});
	};

	this.fillRankingQuestionFromId = function(number, title) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(function() {
			return questionContainer.element(by.css('.spec-ranking-option-1')).sendKeys('Option 1').then(function() {
				return questionContainer.element(by.css('.spec-ranking-option-2')).sendKeys('Option 2');
			});
		});
	};

	this.fillSlideBarQuestionFromId = function(number, title) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(function() {
			return questionContainer.element(by.css('.spec-slidebar-question-type-answer-left')).sendKeys('Very Satisfied').then(function() {
				return questionContainer.element(by.css('.spec-slidebar-question-type-answer-right')).sendKeys('Very Unsatisfied');
			});
		});
	};

	this.fillExpressionQuestionFromId = function(number, title) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(function() {
			questionContainer.element(by.css('#spec_input_expression_word input.input')).sendKeys('Happy ');
			brw.actions().sendKeys(protractor.Key.ENTER).perform();
			questionContainer.element(by.css('#spec_input_expression_word input.input')).sendKeys('Sad ');
			brw.actions().sendKeys(protractor.Key.ENTER).perform();
			questionContainer.element(by.css('#spec_input_expression_word input.input')).sendKeys('Normal ');
			brw.actions().sendKeys(protractor.Key.ENTER).perform();
			questionContainer.element(by.css('#spec_input_expression_word input.input')).sendKeys('Emburrated ');
			brw.actions().sendKeys(protractor.Key.ENTER).perform();
		});
	};

	this.fillImageQuestionFromId = function(number, title) {
		var questionContainer = element(by.css(locatorQuestionContainer + number));
		var i = 1;
		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(function() {
			return questionContainer.all(by.css('.spec-image-upload-option-url')).each(function() {
				user.waits(890);
				questionContainer.element(by.css('.spec-image-upload-option-url-' + i)).click();
				var _el = user.finds('.spec-design-modal-image-url'),
					_url = 'https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png';

				_el.clear().sendKeys(_url).then(function() {
					_el.getAttribute('value').then(function(_value) {
						expect(_value).to.be.equal(_url);
					});
				}).then(function() {
					user.finds('.spec-design-modal-done-button').click();
				});
				i++;
			}).then(function() {
				var j = 1;
				questionContainer.all(by.css('.spec-design-image-title')).each(function() {
					questionContainer.element(by.css('.spec-design-image-title-' + j)).sendKeys('Option ' + j);
					j++;
				});
			});
		});
	};

	this.fillExpressionQuestionAnswers = function() {
		element(by.css('#spec_input_expression_word input.input')).sendKeys('Happy ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_expression_word input.input')).sendKeys('Sad ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_expression_word input.input')).sendKeys('Normal ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_expression_word input.input')).sendKeys('Emburrated ');
		return brw.actions().sendKeys(protractor.Key.ENTER).perform();
	};

	this.fillPositiveExpressionQuestionAnswers = function() {
		element(by.css('#spec_input_positive_expression_word input.input')).sendKeys('Happy ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_positive_expression_word input.input')).sendKeys('UltraHappy ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_positive_expression_word input.input')).sendKeys('KindOfHappy ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_positive_expression_word input.input')).sendKeys('NormalHappy ');
		return brw.actions().sendKeys(protractor.Key.ENTER).perform();
	};

	this.fillNegativeExpressionQuestionAnswers = function() {
		element(by.css('#spec_input_negative_expression_word input.input')).sendKeys('Sad ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_negative_expression_word input.input')).sendKeys('UltraSad ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_negative_expression_word input.input')).sendKeys('KindOfSad ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		element(by.css('#spec_input_negative_expression_word input.input')).sendKeys('NormalSad ');
		return brw.actions().sendKeys(protractor.Key.ENTER).perform();
	};

	this.activateCategoriesInExpressionQuestions = function() {
		return element(by.css('.spec-maker-activate-categories')).click();
	};

	this.fillYesNoQuestion = function(title) {
		return element(by.css('.spec-edit-question-name-any')).clear().sendKeys(title);
	};

	this.fillDateQuestion = function(title) {
		return navigate.sendKeys('.spec-edit-question-name-any', title);
	};

	this.fillTextFieldQuestion = function(title) {
		return navigate.sendKeys('.spec-edit-question-name-any', title);
	};

	this.fillRatingQuestion = function(title) {
		return navigate.sendKeys('.spec-edit-question-name-any', title);
	};

	this.fillRankingQuestion = function(title, op1, op2) {
		navigate.sendKeys('.spec-edit-question-name-any', title);
		navigate.sendKeys('#ranking_option_1', op1);
		return navigate.sendKeys('#ranking_option_2', op2);
	};

	this.fillNumericQuestion = function(title, min, max) {
		if (typeof min !== 'undefined' && typeof max !== 'undefined') {
			return element(by.css('[ng-click="setMinMax(question);"]')).click().then(function() {}, function() {
				// logger.log('Wrong!');
			});
		}

		if (typeof min !== 'undefined') {
			return element(by.css('.spec-maker-numeric-min')).sendKeys(min).then(function() {}, function() {
				// logger.log('Wrong!');
			});
		}

		if (typeof max !== 'undefined') {
			return element(by.css('.spec-maker-numeric-max')).sendKeys(min).then(function() {}, function() {
				// logger.log('Wrong!');
			});
		}

		return navigate.sendKeys('.spec-edit-question-name-any', title);
	};

	this.checkExistance = function(obj) {
		return element.all(by.id(obj)).then(function(arr) {
			// logger.log(obj+ " -- found: " + arr );
			if (arr.length === 0) {
				return false;
			} else return true;
		}, function() {
			// logger.log(obj+ " -- not found: " + err );
			throw 'element not found';
		});
	};

	this.checkQrveyPresence = function(name) {
		return element.all(by.xpath('//*[contains(text(),\'' + name + '\')]')).then(function(arr) {
			// logger.log("zeze" + arr);
			if (arr.length === 0) {
				return false;
			} else return true;
		}, function() {
			// logger.log(obj+ " -- not found: " + err );
			throw 'element not found';
		});
	};

	this.reorderQuestions = function() {
		var q1 = element(by.css('.spec-maker-move-question-0'));
		return brw.driver.actions()
			.mouseDown(q1)
			.mouseMove({
				x: 200,
				y: 400
			})
			.mouseUp()
			.perform();
	};

	this.checkTextPresence = function(name) {
		return element.all(by.xpath('//*[contains(text(),\'' + name + '\')]')).then(function(arr) {
			// logger.log("looking for " + name);
			// logger.log("text found" + arr);
			return arr;
		}, function(err) {
			logger.log('not found' + err);
			return false;
		});
	};

	this.clicks = function(button) {
		return element(by.id(button)).click();
	};

	this.pressTakeQrvey = function() {
		var button = $('.spec-taker-qrvey');
		var isClickable = EC.elementToBeClickable(button);
		brw.wait(isClickable, 10000); //wait for an element to become clickable
		return button.click();
	};

	this.activeQrvey = function(type) {
		navigate.clicksButton('.spec-tab-to-share');
		navigate.clicksButton('#spec_privacy_dropdown');
		navigate.clicksButton('[ng-click="changeVisibility(' + type + ');"]');
		navigate.clicksButton('.spec-qrvey-btn-active');
		var button = $('.copybtn');
		var isClickable = EC.elementToBeClickable(button);
		return brw.wait(isClickable, 10000); //wait for an element to become clickable
	};

	this.getTotal = function() {
		return element.all(by.repeater('question in qrveyObject')).then(function(arr) {
			// logger.log('there are ' + arr.length + ' questions');
			return arr.length;
		}, function() {
			return null;
			// logger.log('couldnt find repeater   ' + err);
		});
	};

	this.selectsQrvey = function() {
		return element(by.css('[ng-click="takenResults(qrvey)"]')).click();
	};

	this.checkPrivacy = function(tab) {
		var aux = null;
		var isVisible = null;

		if (tab != '.spec_individual_responses') {
			aux = $('[ng-click="showContent(' + '\'' + tab + '\'' + ')"]');
			isVisible = EC.elementToBeClickable(aux);
			tab = '[ng-click="showContent(' + '\'' + tab + '\'' + ')"]';
		} else {
			aux = $('.spec_individual_responses');
			isVisible = EC.elementToBeClickable(aux);
		}

		brw.wait(isVisible, 5000);
		return element.all(by.css(tab)).then(function(res) {
			return res;
		}, function(err) {
			logger.log('element: ' + tab + err);
			throw 'element: ' + tab + ' not found---' + err;
		});
	};

	this.openAnalytiqFilterBar = function(){
		return element(by.css('.spec-open-filter-bar')).click();
	};

	this.selectBranchesAction = function(action, questionNumber, branchNumber, levelNumber) {
		action = (typeof action !== 'undefined') ? action : 'follow'; // Follow branch option by default
		questionNumber = (typeof questionNumber !== 'undefined') ? questionNumber : 1; // First question by default
		branchNumber = (typeof branchNumber !== 'undefined') ? branchNumber - 1 : 0; // First branch by default
		levelNumber = (typeof levelNumber !== 'undefined') ? levelNumber : 1; // First level branch by default
		// console.log('branchAction', branchNumber);
		// console.log('levelAction', levelNumber);
		// console.log('questionAction', questionNumber);
		var branchDropdown = this.getBranchesListFromQuestion(questionNumber, levelNumber).get(branchNumber).element(by.css(locatorBranchActionDropdown));

		//Select option

		return branchDropdown.click().then(function(){
			return branchDropdown.element(by.css('.spec-branch-action-' + action)).click();
		});
	};

	this.selectBranchesIfAnswerIs = function(ifansweris, questionNumber, branchNumber, levelNumber) {
		ifansweris = (typeof ifansweris !== 'undefined') ? ifansweris : 'Equal'; // Equal option by default
		questionNumber = (typeof questionNumber !== 'undefined') ? questionNumber : 1; // First question by default
		branchNumber = (typeof branchNumber !== 'undefined') ? branchNumber - 1 : 0; // First branch by default
		levelNumber = (typeof levelNumber !== 'undefined') ? levelNumber : 1; // First level branch by default
		var branchDropdown = this.getBranchesListFromQuestion(questionNumber, levelNumber).get(branchNumber).element(by.css(locatorBranchIfAnswerIsDropdown));

		//Select option

		return branchDropdown.click().then(function(){
			if(ifansweris == 'Does not contain'){
				return browser.actions().mouseDown(branchDropdown.element(by.xpath(".//ul/li[normalize-space(text()) = '" + ifansweris + "']"))).click().perform().then(function(){ // eslint-disable-line
					logger.info('clicked');
				});
			}else {
				return branchDropdown.element(by.xpath(".//ul/li[normalize-space(text()) = '" + ifansweris + "']")).click(); // eslint-disable-line
			}
		});
	};
};

module.exports = new Qrveyhelpers();
