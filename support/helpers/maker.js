'use strict';

const util = require('util');
const Userb = require('./userb');

var Maker = function () {
	Userb.call(this);
};

util.inherits(Maker, Userb);

Maker.prototype.actionSearch = function () {
	this.finds('.spec_search_input').sendKeys(protractor.Key.ENTER);
	return this.waits(2000);
};

Maker.prototype.activatesAddOtherOption = function () {
	return this.finds('.spec-active-option-add-other-option').click();
};

Maker.prototype.activatesAllowDecimals = function () {
	return this.finds('.spec-maker-allow-decimals').click();
};

Maker.prototype.activatesAllowMultipleSelections = function () {
	return this.finds('.spec-active-option-allow-multiple-selection + label').click();
};

Maker.prototype.activatesQrvey = function () {
	this.finds('.spec-tab-to-share').click();
	return this.finds('.spec-qrvey-btn-active').click();
};

Maker.prototype.activatesTagsOption = function () {
	return this.finds('.spec-add-tags-question').click();
};

Maker.prototype.addFillOptionsToQuestionID = function (numberOfOptions, questionNumber, typeOfQuestion) {
	switch (typeOfQuestion) {
		case 'multiple choice':
			return qrvey.addfillMultipleChoiceOptionsFromId(numberOfOptions, questionNumber, 'What option is more effective?');
		case 'image':
			return qrvey.addfillImageOptionsFromId(numberOfOptions, questionNumber, 'Which one do you like the most?');
		case 'yes-no':
		case 'yes no':
		case 'yes/no':
			return qrvey.fillQuestionTittleFromID(questionNumber, 'Are you agree with Donald Trumps politics?');
		default:
			return qrvey.fillQuestionDefaultFromID(questionNumber);
	}
};

Maker.prototype.addImageOptions = function (_all_images_possible = 3) {
	var deferred = protractor.promise.defer(),
		el = element.all(by.css('.spec-add-option-image-question')).last();

	async.times(all_images_possible, function (n, next) {
		scrollIntoElement(el, function () {
			el.click();
			this.waits(100);

			next();
		});
	}, function (err) {
		if (err) throw new Error(err);
		deferred.fulfill();
	});

	return deferred.promise;
};

Maker.prototype.addImageTitles = function () {
	var deferred = protractor.promise.defer(),
		_title = null,
		maxNum = 16;

	this.findsAll('.spec-design-image-title').count().then(function (num) {
		var i = 0;

		async.times(num, function (n, next) {
			i = n + 1;
			_title = rand.getText(maxNum);

			self.finds('.spec-design-image-title-' + i).sendKeys(_title).getAttribute('value').then(function (_text) {
				logger.log('text1', _title);
				logger.log('text2', _text);

				expect(_title.slice(0, -1)).to.be.equal(_text);
				expect(_text.length).to.be.equal(15);

				next();
			});
		}, function (err) {
			if (err) throw new Error(err);
			deferred.fulfill();
		});
	});

	return deferred.promise;
};

Maker.prototype.addIntroPage = function () {
	this.findsAll('.spec-design-add-state').first().click();
	this.finds('.spec-design-add-intro').click();
	this.finds('#form_intro_title').clear().sendKeys(rand.getParagraph(4));
	this.finds('#form_intro_content').clear().sendKeys(rand.getParagraph(20));
	this.finds('#form_intro_button').clear().sendKeys(rand.getParagraph(1));
	return this.finds('#form_intro_title').click();
};

Maker.prototype.addNewToken = function (typeToken) {
	typeToken = typeToken.toLowerCase();

	this.finds('.spec-automatiq-add-token').click();
	this.waitsFor('.modal-dialog');

	this.finds('.spec-automatiq-token-select-qrvey').click();
	this.finds('ul.open .scroll-select .spec-automatiq-token-qrvey-option-1').click();

	this.waitsFor('.tokens-questions');
	this.finds('.spec-automatiq-token-question-option-1').click();
	this.finds('.spec-automatiq-token-label-input').sendKeys(typeToken);
	this.finds('.spec-automatiq-token-add-button').click();

	expect(this.finds('.tokens-label').getText()).to.eventually.be.equal('{{' + typeToken + '}}');

	return this.finds('.spec-close-modal').click();
};

Maker.prototype.addsNewQuestion = function () {
	this.finds('.spec-design-add-state').click();
	return this.finds('.spec-design-add-new-question').click();
};

Maker.prototype.buildQuestion = function (type) {
	var defer = protractor.promise.defer();
	var self = this;

	if (type !== 'checklist' && type !== 'nps') {
		this.selectQuestionFromDropdown(type).then(function () {
			return self.isQuizOnMaker();
		}).then(function (_isQuizOnMaker) {
			return self.createsQuestionByType(type, _isQuizOnMaker);
		}).then(function () {
			defer.fulfill();
		});
	} else {
		this.isQuizOnMaker().then(function (_isQuizOnMaker) {
			return self.createsQuestionByType(type, _isQuizOnMaker);
		}).then(function () {
			defer.fulfill();
		});
	}

	return defer.promise;
};

Maker.prototype.clicksOutside = function () {
	return this.finds('body').click();
};

Maker.prototype.createOptionsDropdown = function (numOpt = 9) {
	var list = '';
	var index = 1;

	for (index = 1; index <= numOpt; index++) {
		list += 'Option' + index;
		if (index + 1 <= numOpt) list += '\n';
	}
	return this.finds('.dropdown-text').sendKeys(list);
};

Maker.prototype.createPage = function () {
	this.finds('#spec_new_page').click();
	this.finds('.spec-input-new-process-name').clear().sendKeys(rand.getSentence(5));
	this.finds('.spec-input-new-process-description').clear().sendKeys(rand.getSentence(15));
	return this.finds('.spec-button-create-process').click();
};

Maker.prototype.createPageWithTitle = function (title) {
	this.finds('.spec_pages_create_new_button').click();
	this.finds('.spec-input-new-process-name').clear().sendKeys(title);
	this.finds('.spec-input-new-process-description').clear().sendKeys(rand.getSentence(15));
	return this.finds('.spec-button-create-process').click();
};

Maker.prototype.createsActionToPage = function (_typeOfAction, typeOfQrvey, _view) {
	this.finds('.spec-automatiq-block-action-view-open').click();
	this.finds('.spec-automatiq-select-action-open').click();
	this.finds('.spec-automatiq-select-action-' + _typeOfAction).click();
	this.finds('.spec-automatiq-show-results-select-qrvey span').click();
	this.finds('.spec-show-results-' + typeOfQrvey).click();
	this.finds('.spec-show-results-qrvey').click();
	this.waits(5000);

	this.findsAll('.spec-show-results-qrvey ul div li').get(1).click();

	var view = 0;
	if (typeOfQrvey == 'form' || typeOfQrvey == 'questionnaire') {
		this.finds('.automatiq-select-results-view span').click();
	} else {
		this.finds('.automatiq-select-results-view').click();
	}

	if (_view == 'detailed' || _view == null) {
		view = 0;
	} else if (_view == 'summary') {
		view = 1;
	} else if (_view == 'tabular') {
		view = 2;

		if (typeOfQrvey == 'form') {
			view = 3;
		}
	}

	return this.findsAll('.automatiq-select-results-view ul div li').get(view).click();
};

Maker.prototype.createsDateQuestion = function (params = {}) {
	if (params.isQuiz) {
		element(by.css('.right-answer-input input')).click();
		element(by.css('.mat-calendar-body-today')).click();
	}

	qrvey.questionType('spec_da_qt');
	return this.createsTitleForQuestion().then(function () {
		return self.clicksOutside();
	});
};

Maker.prototype.createsDropdownQuestion = function () {
	qrvey.questionType('spec_dr_qt');

	return this.createsTitleForQuestion().then(function () {
		return self.createOptionsDropdown();
	});
};

Maker.prototype.createsExpressionQuestion = function () {
	qrvey.questionType('spec_ex_qt');
	this.waits(200);
	this.fillExpressionQuestionAnswers();
	return this.createsTitleForQuestion();
};

Maker.prototype.createsImageQuestion = function (params = {}) {
	var deferred = protractor.promise.defer(),
		self = this,
		count = 0;

	if (typeof params.typeOfInput === 'undefined') params.typeOfInput = 'url';

	this.createsTitleForQuestion();

	async.during(function (cb) {
		self.finds('.spec-add-option-image-question').isDisplayed().then(function (_displayed) {
			return cb(null, _displayed);
		}).catch(function () {
			return cb(null, false);
		});
	}, function (next) {
		self.finds('.spec-add-option-image-question').click();
		next();
	}, function (err) {
		if (err) throw new Error(err);
	});

	var n = 0;

	self.findsAll('.spec-image-upload-option-url').count().then(function (_count) {
		count = _count;

		logger.log('params.typeOfInput', params.typeOfInput);

		if (params.typeOfInput == 'url') {
			logger.log('by URL');

			scrollToTop();

			async.times(count, function (n, next) {
				var _url = 'https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png';
				var el = self.finds('.spec-image-upload-option-url-' + n);

				el.click();

				self.finds('.spec-design-modal-image-url').clear().sendKeys(_url).getAttribute('value').then(function (_value) {
					expect(_value).to.be.equal(_url);

					self.finds('.spec-design-modal-done-button').click().then(function () {
						return self.waits(500);
					}).then(function () {
						if (params.isQuiz) {
							return self.findsAll('.spec-quiz-right-answer + input:not(.spec-quiz-right-answer)').get(n).sendKeys(
								rand.getWord(5)
							);
						} else {
							return self.findsAll('.label-container input').get(n).sendKeys(
								rand.getWord(5)
							);
						}
					}).then(function () {
						logger.log('Finish log');

						self.waits(500);
						logger.log('i', n);
						next();
					});
				});
			}, function (err) {
				if (err) throw new Error(err);
				else logger.log('completed');

				deferred.fulfill();
			});
		} else if (params.typeOfInput == 'desktop') {

			// var i = n + 1;
			// var num = 100 + (i >= 6 ? i * 10 : i * 3);

			// scrollIntoElement(el, function () {
			// 	// scrollAxisY(num.toString());
			// 	el.click();
			// 	self.waits(100);
			// 	n++;

			// 	next();
			// });
		}
	});

	// }, function (err, n){

	// 	if (params.isQuiz){
	// 		element.all(by.css('.spec-quiz-right-answer')).first().click();
	// 	}

	// 	deferred.fulfill();
	// });

	// if (_typeOfInput == 'url') {
	// 	logger.log('finished');

	// 	scrollToTop();

	// 	this.findsAll('.spec-image-upload-option-url').count().then(function (num) {
	// 		logger.log('num', num);
	// 		var i = 0;

	// 		async.eachSeries(gArray(num), function (n, next) {

	// 			var _el = self.finds('.spec-design-modal-image-url');
	// 			var _url = 'https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png';
	// 			var el = self.finds('.spec-image-upload-option-url-' + i);
	// 			el.click();

	// 			_el.clear().sendKeys(_url).getAttribute('value').then(function (_value) {
	// 				expect(_value).to.be.equal(_url);

	// 				self.finds('.spec-design-modal-done-button').click().then(function () {
	// 					logger.log('Finish log');

	// 					self.waits(500);
	// 					logger.log('i', i);
	// 					i++;
	// 				}).then(function () { next(); });
	// 			});
	// 		}, function (err) {
	// 			if (err) throw err;
	// 			else logger.log('completed');

	// deferred.fulfill();
	// 		});
	// 	});
	// } else if (_typeOfInput == 'desktop') {
	// 	var path = require('path'),
	// 		remote = require('selenium-webdriver/remote'),
	// 		absolutePath = path.resolve(__dirname, '../../support/logos/google.png');

	// 	brw.driver.setFileDetector(new remote.FileDetector());

	// 	this.findsAll('.spec-image-upload-option-desktop').count().then(function (num) {
	// 		async.times(num, function (i, next) {
	// 			var _el = self.finds('.spec-image-upload-option-desktop-' + i); //start in 0
	// 			logger.log('i', i);
	// 			logger.log(absolutePath);

	// 			_el.sendKeys(absolutePath);
	// 			var _ele = element.all(by.css('.image-container img')).get(i);

	// 			self.waitsElementPresence(_ele);

	// 			_ele.getAttribute('src').then(function (_text) {
	// 				expect(_text).to.not.be.equal('');
	// 				self.waits(900);
	// 				next();
	// 			});
	// 		}, function (err) {
	// 			if (err) throw err;

	// 			deferred.fulfill();
	// 		});
	// 	});
	// }

	return deferred.promise;
};

Maker.prototype.createsIncontext = function () {
	this.finds('.spec_dashboard_create_new_button').click();
	this.finds('.spec_dropdown_create_incontextfeedback_button').click();

	this.finds('.spec-input-new-incontext-name').sendKeys(
		rand.getParagraph(10)
	);
	this.finds('.spec-input-new-incontext-description').sendKeys(
		rand.getParagraph(30)
	);
	return this.finds('.spec-button-create-incontext').click();
};

Maker.prototype.createsListOptions = function (type = 'multichoice') {
	var deferred = protractor.promise.defer();

	async.during(function (cb) {
		hasClass(self.findsAll('.icon.q-icon-add').last(), 'disabled').then(function (_val) {
			logger.log('val', !_val);
			return cb(null, !_val);
		});
	}, function (next) {
		self.waits(400);
		self.findsAll('.icon.q-icon-add').last().click().then(function () {
			next();
		});
	});

	var el = null;
	self.findsAll('.icon.q-icon-add').count().then(function (_count) {
		async.times(_count, function (n, next) {
			el = self.finds('.spec-' + type + '-option-' + (n + 1));
			scrollIntoElement(el);
			el.sendKeys('Option ' + (n + 1)).then(function () {
				next();
			});
		}, function () {
			deferred.fulfill();
		});
	});

	return deferred.promise;
};

Maker.prototype.createsMultiChoiceTypeQuestion = function (params = {}) {
	var self = this;

	if (params.isQuiz) this.finds('.answer .right-answer input').first().click();

	return this.createsTitleForQuestion().then(function () {
		return self.createsListOptions('multichoice');
	});
};

Maker.prototype.createsNps = function () {
	this.finds('.spec_dashboard_create_new_button').click();
	this.finds('.spec_dropdown_create_nps_button').click();

	return this.finds('.spec-button-create-nps').click();
};

Maker.prototype.createsNpsQuestion = function (_nameEnterprise = 'QRVEY', _textfieldText = 'Could you please explain your choice? Thank you!') {
	this.finds('.qrvey-info-editor-container').click();
	element.all(by.css('.spec_edit_question_overlay')).get(0).click();
	this.finds('.spec-nps-title-question-input').clear().sendKeys(_nameEnterprise);
	element.all(by.css('.spec_edit_question_overlay')).get(0).click();
	this.finds('.spec-nps-title-textfield-question-input').clear().sendKeys(_textfieldText);
	element.all(by.css('.spec_edit_question_overlay')).get(0).click();

	return element(by.css('.spec-nps-title-question-input')).getAttribute('value').then(function (_html) {
		expect(_html).to.be.equal(_nameEnterprise);
	});
};

Maker.prototype.createsNumericTypeQuestion = function (params = {}) {
	if (params.isQuiz) this.finds('.right-answer-input input').sendKeys(10);

	qrvey.questionType('spec_nu_qt');
	return this.createsTitleForQuestion();
};

Maker.prototype.createsPages = function (action) {
	var deferred = protractor.promise.defer();

	this.findsAll('.spec_pages_button').first().click();
	this.finds('#spec_new_page').click();
	this.finds('.spec-input-new-process-name').clear().sendKeys(
		rand.getSentence(5)
	);
	this.finds('.spec-button-create-process').click();

	this.waitsFor('.spec-automatiq-block-action-view-open');
	this.findsAll('.spec-automatiq-block-action-view-open').get(0).click();
	this.findsAll('.spec-automatiq-select-action-open').get(0).click();
	this.findsAll('.spec-automatiq-select-action-' + action).get(0).click();

	if (action === 'showmsg') {
		this.finds('.spec-automatiq-show-message input').sendKeys(
			rand.getSentence(10)
		);
		this.finds('.spec-automation-btn-activate').click();

		this.waitsFor('.toggle');
		this.findsAll('.pages-list.qrvey-list.qrvey-pages-list .page .toggle').first().click();

		deferred.fulfill();
	} else throw new Error('The action is not supported yet');

	return deferred.promise;
};

Maker.prototype.createsPolling = function (_title = 'NPS Survey in Qrvey', _description = 'NPS Survey in Qrvey') {
	this.finds('.spec_dashboard_create_new_button').click();
	this.finds('.spec_dropdown_create_polling_button').click();

	this.finds('.spec-input-new-polling-name').sendKeys(_title);
	this.finds('.spec-input-new-polling-description').sendKeys(_description);
	return this.finds('.spec-button-create-polling').click();
};

Maker.prototype.createsProcess = function (_title, _description) {
	this.finds('.spec_workflows_button').click();
	this.finds('#spec_new_process').click();

	this.finds('.spec-input-new-process-name').sendKeys(
		rand.getParagraph(10)
	);
	this.finds('.spec-input-new-process-description').sendKeys(
		rand.getParagraph(30)
	);

	return this.finds('.spec-button-create-process').click();
};

Maker.prototype.createsQuestionByType = function (_type, _isQuiz) {
	var deferred = protractor.promise.defer();
	logger.log('createsQuestionByType', _type);

	switch (_type) {
		case 'date':
			this.createsDateQuestion({
				isQuiz: _isQuiz
			}).then(function () {
				deferred.fulfill();
			});
			break;
		case 'nps':
			this.createsNpsQuestion().then(function () {
				deferred.fulfill();
			});
			break;
		case 'checklist':
			this.createsSectionQuestion().then(function () {
				deferred.fulfill();
			});
			break;
		case 'multiple_choice':
		case 'multiple choice':
			this.createsMultiChoiceTypeQuestion({
				isQuiz: _isQuiz
			}).then(function () {
				deferred.fulfill();
			});
			break;
		case 'slidebar':
		case 'slide_bar':
		case 'slide bar':
			this.createsSlideBarQuestion({
				stops: 3
			}).then(function () {
				deferred.fulfill();
			});
			break;
		case 'numeric':
			this.createsNumericTypeQuestion({
				isQuiz: _isQuiz
			}).then(function () {
				deferred.fulfill();
			});
			break;
		case 'short text':
		case 'short_text':
		case 'long text':
		case 'long_text':
		case 'name':
		case 'email':
		case 'address':
		case 'password':
			this.createsTextFieldQuestion({
				isQuiz: _isQuiz
			}).then(function () {
				deferred.fulfill();
			});
			break;
		case 'expression':
			this.createsExpressionQuestion().then(function () {
				deferred.fulfill();
			});
			break;
		case 'image':
			this.createsImageQuestion({
				isQuiz: _isQuiz
			}).then(function () {
				deferred.fulfill();
			});
			break;
		case 'rating':
			this.createsRatingQuestion().then(function () {
				deferred.fulfill();
			});
			break;
		case 'ranking':
			this.createsRankingQuestion({
				isQuiz: _isQuiz
			}).then(function () {
				deferred.fulfill();
			});
			break;
		case 'yes_no':
		case 'yes no':
			this.createsYesOrNotQuestion({
				isQuiz: _isQuiz
			}).then(function () {
				deferred.fulfill();
			});
			break;
		case 'dropdown':
			this.createsDropdownQuestion().then(function () {
				deferred.fulfill();
			});
			break;
		default:
			throw new Error('The ' + _type + ' type of question is undefined');
	}

	return deferred.promise;
};

Maker.prototype.createsRankingQuestion = function (params = {}) {
	if (params.isQuiz) {
		element(by.css('.spec-ranking-option-1')).sendKeys('Option 1');
		element(by.css('.spec-ranking-option-2')).sendKeys('Option 2');
	}

	qrvey.questionType('spec_rn_qt');

	return this.createsTitleForQuestion().then(function () {
		return self.createsListOptions('ranking');
	});
};

Maker.prototype.createsRatingQuestion = function () {
	qrvey.questionType('spec_rt_qt');
	return this.createsTitleForQuestion();
};

Maker.prototype.createsSectionQuestion = function () {
	var self = this;

	return this.createsTitleForQuestion().then(function () {
		return self.createsListOptions('multichoice');
	});
};

Maker.prototype.createsShortTextFiledQuestion = function () {
	qrvey.questionType('spec_st_qt');
	return this.createsTitleForQuestion();
};

Maker.prototype.createsSlideBarQuestion = function (params = {}) {
	var _stops = (typeof params.stops !== 'undefined') ? params.stops : 3;

	qrvey.questionType('spec_sl_qt');
	this.waits(200);

	this.createsTitleForQuestion();

	this.finds('.spec-slidebar-question-type-answer-left').sendKeys(
		rand.getParagraph(10)
	).getAttribute('value').then(function (_val) {
		expect(_val.length).to.be.equal(54);
	});

	this.finds('.spec-slidebar-question-type-answer-right').sendKeys(
		rand.getParagraph(10)
	).getAttribute('value').then(function (_val) {
		expect(_val.length).to.be.equal(54);
	});

	if (_stops != 3) {
		this.finds('.spec-slidebar-number-option-' + _stops).click();
	}

	return this.clicksOutside();
};

Maker.prototype.createsTextFieldQuestion = function (params = {}) {
	if (params.isQuiz) this.finds('.answer input').sendKeys(
		rand.getParagraph(10)
	);
	return this.createsTitleForQuestion();
};

Maker.prototype.createsTitleForQuestion = function (text) {
	return this.findsAll('.spec-edit-question-name-any').last().clear().sendKeys(
		rand.getParagraph(20)
	).getAttribute('value').then(function (_val) {
		expect(_val.length).to.be.equal(160);
	});
};

Maker.prototype.createsWebform = function (obj) {
	if (!_.get(obj, 'title')) obj.title = rand.getParagraph(10);
	if (!_.get(obj, 'description')) obj.description = rand.getParagraph(30);
	if (!_.get(obj, 'type')) obj.type = 'survey';
	if (obj.type == 'form') obj.type = 'forms';

	this.finds('.spec_dropdown_create_' + obj.type + '_button').click();

	var _el = '.spec-button-create-' + obj.type;
	if (obj.type !== 'quiz') scrollIntoElement(this.finds(_el));

	this.finds(_el).click();
	this.waitsFor('.spec_title_description');
	return this.fillQrveyNameOrDescription(obj.title, 'name', obj.type);
};

Maker.prototype.createsYesOrNotQuestion = function (params = {}) {
	if (params.isQuiz) this.finds('.spec-quiz-right-answer-Yes').click();

	qrvey.questionType('spec_yn_qt');
	return this.createsTitleForQuestion();
};

Maker.prototype.currentStateQrvey = function () {
	return this.finds('.spec-qrvey-item-0').element(by.css('.spec-qrvey-status-draft')).getInnerHtml();
};

Maker.prototype.deleteAnDashboard = function (_appID) {
	return ds.getAll(_appID).then(function (_resp) {
		logger.log('items', _resp);
		if (_resp.Items.length > 0) {
			logger.log();
			for (var i = 0; i < _resp.Items.length; i++) {
				var dsbID = _resp.Items[i].dashboardpanelid;
				ds.delete(dsbID).then(function () {
					logger.log('Deleted analytic dashboard id: ', dsbID);
				});
			}
		}
	});
};

Maker.prototype.deleteMesssage = function (_state) {
	_state = (typeof _state !== 'undefined') ? _state : 'confirm';

	if (_state == 'confirm') {
		return this.finds('.spec-delete-qrvey-confirm').click();
	} else if (_state == 'cancel') {
		return this.finds('.spec-delete-qrvey-cancel').click();
	}
};

Maker.prototype.editsQuery = function () {
	this.finds('.spec-create-qrvey').click();
	this.finds('.spec_create_modal_name_field').sendKeys('Product Use Satisfaction');
	this.finds('.spec_create_modal_description_field').sendKeys('Please help us to better understand your needs by completing this qrvey. Thank you for your time.');
	this.finds('.spec-button-create-survey').click();
	return this.finds('.spec-save-new-qrvey').click();
};

Maker.prototype.fillExpressionQuestionFromId = function (number, title) {
	var locatorQuestionContainer = '.spec-question-container-';
	var questionContainer = this.finds(locatorQuestionContainer + number);
	var locatorExpressionInput = by.css('.spec_input_expression_word');

	return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(function () {
		questionContainer.element(locatorExpressionInput).sendKeys('Happy ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		questionContainer.element(locatorExpressionInput).sendKeys('Sad ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		questionContainer.element(locatorExpressionInput).sendKeys('Normal ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		questionContainer.element(locatorExpressionInput).sendKeys('Emburrated ');
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
	});
};

Maker.prototype.fillImageQuestionFromId = function (number, title) {
	var locatorQuestionContainer = '.spec-question-container-';
	var questionContainer = this.finds(locatorQuestionContainer + number);
	var self = this;

	var i = 0;
	return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(function () {
		return questionContainer.all(by.css('.spec-image-upload-option-url')).each(function () {
			self.waits(890);
			questionContainer.element(by.css('.spec-image-upload-option-url-' + i)).click();

			var _el = self.finds('.spec-design-modal-image-url');
			var _url = 'https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png';

			_el.clear().sendKeys(_url).then(function () {
				return _el.getAttribute('value');
			}).then(function (_value) {
				expect(_value).to.be.equal(_url);
			}).then(function () {
				self.finds('.spec-design-modal-done-button').click();
			});

			i++;
		}).then(function () {
			var j = 1;

			questionContainer.all(by.css('.spec-design-image-title')).each(function () {
				questionContainer.element(by.css('.spec-design-image-title-' + j)).sendKeys('Option ' + j);
				j++;
			});
		});
	});
};

Maker.prototype.fillMultipleChoiceQuestionFromId = function (number, title) {
	var locatorQuestionContainer = '.spec-question-container-';
	var questionContainer = this.finds(locatorQuestionContainer + number);

	questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
	questionContainer.element(by.css('.spec-multichoice-option-1')).sendKeys('Option 1');
	return questionContainer.element(by.css('.spec-multichoice-option-2')).sendKeys('Option 2');
};

Maker.prototype.fillQrveyNameOrDescription = function (context, field, typeQrvey) {
	var self = this;

	return this.finds('.spec_title_description').click().then(function () {
		scrollToTop();

		self.finds('.spec_editing_title_description input').clear().sendKeys(
			rand.getParagraph(2)
		).getAttribute('value').then(function (_val) {
			expect(_val.length).to.be.equal(36);
		});

		self.finds('.spec_editing_title_description textarea').clear().sendKeys(
			rand.getParagraph(10)
		).getAttribute('value').then(function (_val) {
			expect(_val.length).to.be.equal(176);
		});

	}).then(function () {
		if (typeQrvey == 'quiz' || typeQrvey == 'survey' || typeQrvey == 'forms') {
			if (typeQrvey == 'survey') {
				self.finds('.question-preview-mode').click();
			} else self.finds('.spec_edit_question_overlay').click();
		}

		if (typeQrvey == 'nps' || typeQrvey == 'checklist') {
			self.waits(1300);
			self.finds('.spec-question-title').click();
		}

		var clickQuestionName = (typeQrvey == 'nps') ? '.spec-nps-title-question-input' : '.spec-edit-question-name-any';

		if (typeQrvey == 'nps') self.waits(300);

		self.finds(clickQuestionName).click();
	});
};

Maker.prototype.fillQuestionByTypeAndID = function (number, typeOfQuestion) {
	switch (typeOfQuestion) {
		case 'address':
			return this.fillQuestionTittleFromID(number, 'Where do you live?');
		case 'multiple choice':
			return this.fillMultipleChoiceQuestionFromId(number, 'What option is more effective?');
		case 'rating':
			return this.fillQuestionTittleFromID(number, 'Rate the product please.');
		case 'short text':
		case 'short-text':
		case 'short_text':
			return this.fillQuestionTittleFromID(number, 'Give a brief opinion about the site');
		case 'long text':
		case 'long-text':
		case 'long_text':
			return this.fillQuestionTittleFromID(number, 'What do you think about the customer service?');
		case 'yes-no':
		case 'yes no':
		case 'yes/no':
			return this.fillQuestionTittleFromID(number, 'Are you agree with Donald Trumps politics?');
		case 'ranking':
			return this.fillRankingQuestionFromId(number, 'Rank this 2 options.');
		case 'date':
			return this.fillQuestionTittleFromID(number, 'Enter your birthdate');
		case 'slidebar':
		case 'slide_bar':
		case 'slide bar':
			return this.fillSlideBarQuestionFromId(number, 'How satisfied are you with this product?');
		case 'expression':
			return this.fillExpressionQuestionFromId(number, 'How do you feel today?');
		case 'numeric':
			return this.fillQuestionTittleFromID(number, '2x + 8 = 9; x = ?');
		case 'image':
			return this.fillImageQuestionFromId(number, 'Which one do you like the most?');
		default:
			return this.fillQuestionDefaultFromID(number);
	}
};

Maker.prototype.fillQuestionDefaultFromID = function (number) {
	var locatorQuestionContainer = '.spec-question-container-';
	var questionContainer = this.finds(locatorQuestionContainer + number);
	return questionContainer.element(by.css('.spec-edit-question-name-any')).click();
};

Maker.prototype.fillQuestionTittleFromID = function (number, title) {
	var locatorQuestionContainer = '.spec-question-container-';
	var questionContainer = this.finds(locatorQuestionContainer + number);
	return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
};

Maker.prototype.fillRankingQuestionFromId = function (number, title) {
	var locatorQuestionContainer = '.spec-question-container-';
	var questionContainer = this.finds(locatorQuestionContainer + number);

	questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
	questionContainer.element(by.css('.spec-ranking-option-1')).sendKeys('Option 1');
	return questionContainer.element(by.css('.spec-ranking-option-2')).sendKeys('Option 2');
};

Maker.prototype.fillSlideBarQuestionFromId = function (number, title) {
	var locatorQuestionContainer = '.spec-question-container-';
	var questionContainer = this.finds(locatorQuestionContainer + number);

	questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
	questionContainer.element(by.css('.spec-slidebar-question-type-answer-left')).sendKeys('Very Satisfied');
	return questionContainer.element(by.css('.spec-slidebar-question-type-answer-right')).sendKeys('Very Unsatisfied');
};

Maker.prototype.fillsRankingQuestion = function (_titles) {
	this.createsTitleForQuestion();

	var _length = 0,
		t = 1,
		i = 0;

	_titles = (typeof _titles !== 'undefined') ? _titles : {
		'1': 'Ironman',
		'2': 'Spiderman'
	};

	_length = Object.keys(_titles).length;

	if (_length < 2) throw new Error('Error, the minium question is 2');

	if (_length > 2) {
		for (i = 0; i <= _length - 3; i++) {
			this.findsAll('.spec-add-option-ranking-question-0').last().click();
		}
	}

	for (i = 1; i <= _length; i++) {
		this.finds('.spec-ranking-option-' + t).sendKeys(_titles[i]);
		t++;
	}

	return this.waits(100);
};

Maker.prototype.findsUrlToTaker = function () {
	var el = this.finds('.spec-qrvey-url-share');
	return el.getAttribute('value');
};

Maker.prototype.forgotPassword = function (username) {
	this.finds('.spec-user-forgot-password').clear().sendKeys(username);
	return this.finds('.spec-user-forgot-password-btn').click();
};

Maker.prototype.getQuestionType = function () {
	var defer = protractor.promise.defer();

	element(by.css('.question-type-selector')).getText().then(function (_text) {
		defer.fulfill(_text.toLowerCase());
	});

	return defer.promise;
};

Maker.prototype.getTypeQuestionOnTaker = function (idx) {
	var defer = protractor.promise.defer();

	webpage.waits(500);
	this.findsAll('[data-qtype]').get(idx).getAttribute('data-qtype').then(function (_type) {
		defer.fulfill(_type);
	});

	return defer.promise;
};

Maker.prototype.getsInputTextExists = function (_locator, _text) {
	return element.all(by.css(_locator)).filter(function (elem) {
		return elem.getAttribute('value').then(function (_val) {
			return _text.includes(_val);
		});
	}).count().then(function (length) {
		return length > 0;
	});
};

Maker.prototype.getsTotal = function (_repeat) { // 'question in qrveyObject'
	return element.all(by.repeater(_repeat)).then(function (arr) {
		return arr.length;
	}, function () {
		return null;
	});
};

Maker.prototype.getsTotalByCss = function (_class) {
	return this.findsAll(_class).count();
};

Maker.prototype.goToTaken = function () {
	this.waits(2000);
	return this.finds('.spec_taken_qrveys_button').click();
};

Maker.prototype.isQuizOnMaker = function () {
	var defer = protractor.promise.defer();

	this.getsTextExists('Quiz').then(function (_val) {
		console.log('isQuizOnMaker', _val);
		defer.fulfill(_val);
	});

	return defer.promise;
};

Maker.prototype.isVisibleQuestionPath = function () {
	return this.finds('.spec-question-path').isDisplayed();
};

Maker.prototype.makerMovesQuestion = function (_where = 'up', _number = 0) {
	var _dir = (_where == 'up') ? { x: 0, y: 500 } : { x: 0, y: -500 },
		_el = this.finds('.spec-maker-move-question-' + _number);

	brw.actions().mouseDown(_el).perform();
	this.waits(2000);
	brw.actions().mouseMove(_el, _dir).perform();
	return brw.actions().mouseUp().perform();
};

Maker.prototype.movesSlidebar = function (_distance) {
	var _el = this.findsAll('.rz-pointer').first();

	brw.actions().mouseDown(_el).perform();
	this.waits(2000);
	return brw.actions().mouseMove(_el, {
		x: _distance,
		y: 0
	}).perform();
};

Maker.prototype.opensPathQuestion = function (_number = 1) {
	return this.findsAll('.spec-path-question').then(function (elements) {
		elements[_number - 1].click();
	});
};

Maker.prototype.previewsQrvey = function () {
	return this.finds('.spec-design-preview-link').click();
};

Maker.prototype.publishWebform = function () {
	this.finds('.spec-tab-to-share').click();
	return this.finds('.spec-qrvey-btn-active').click();
};

Maker.prototype.search = function (_text) {
	this.finds('.spec_search_input').sendKeys(_text);
	return this.waits(2000);
};

Maker.prototype.selectQuestionFromDropdown = function (typeOfQuestion) {
	var defer = protractor.promise.defer();

	var _text = '';

	switch (typeOfQuestion) {
		case 'multiple choice':
		case 'multiple_choice':
			_text = 'Multiple Choice';
			break;
		case 'upload_image':
		case 'upload-image':
		case 'upload image':
			_text = 'Image Upload';
			break;
		case 'image':
			_text = 'Image';
			break;
		case 'expression':
			_text = 'Expression';
			break;
		case 'numeric':
			_text = 'Numeric';
			break;
		case 'ranking':
			_text = 'Ranking';
			break;
		case 'rating':
			_text = 'Rating';
			break;
		case 'short text':
		case 'short_text':
			_text = 'Short Text';
			break;
		case 'slider bar':
		case 'slider_bar':
		case 'slide bar':
			_text = 'Slide Bar';
			break;
		case 'yes no':
		case 'yes_no':
		case 'yes-no':
			_text = 'Yes / No';
			break;
		case 'date':
			_text = 'Date';
			break;
		// case 'nps':
		// 	_text = 'spec_nps_qt';
		// 	break;
		case 'long text':
		case 'long_text':
		case 'long-text':
			_text = 'Long Text';
			break;
		case 'email':
			_text = 'Email';
			break;
		case 'address':
			_text = 'Address';
			break;
		case 'phone':
			_text = 'Phone Number';
			break;
		case 'name':
			_text = 'Name';
			break;
		case 'us-address':
			_text = 'US Address';
			break;
		// case 'look up':
		// 	_text = 'spec_lk_qt';
		// break;
		case 'password':
			_text = 'Password';
			break;
		// case 'credit card':
		// case 'credit_card':
		// 	_text = 'spec_cc_qt';
		// 	break;
		case 'digital_signature':
		case 'digital-signature':
		case 'digital signature':
			_text = 'Digital Signature';
			break;
		case 'dropdown':
			_text = 'Dropdown';
			break;
		case 'slidebar':
			_text = 'Slide Bar';
			break;
		default:
			throw new Error('The type of question is undefined when the user try to select ' + typeOfQuestion + ' in the dropdown menu');
	}

	scrollToTop();
	element(by.css('#questionType_dropdown')).click();
	element.all(by.cssContainingText('.question-type span', _text)).last().click().then(function () {
		if (_text == 'slider bar') {
			expect(hasClass(element(by.id('spec-slidebar-number-option-3')), 'active')).to.eventually.be.true;
			expect(hasClass(element(by.id('spec-slidebar-number-option-5')), 'active')).to.eventually.not.be.true;
			expect(hasClass(element(by.id('spec-slidebar-number-option-7')), 'active')).to.eventually.not.be.true;
			expect(hasClass(element(by.id('spec-slidebar-number-option-9')), 'active')).to.eventually.not.be.true;
		}
	}).then(function () {
		defer.fulfill();
	});

	return defer.promise;
};

Maker.prototype.selectTemplate = function (_category) {
	switch (_category) {
		case 'friends':
			return this.finds('.spec-friends-templates').click();
		case 'customers':
			return this.finds('.spec-customers-templates').click();
		case 'colleagues':
			return this.finds('.spec-colleagues-templates').click();
		case 'event':
			return this.finds('.spec-event-templates').click();
		case 'students':
			return this.finds('.spec-students-templates').click();
	}
};

Maker.prototype.selectsOptionOfQuestion = function (_number = 0) {
	var _el = this.findsAll('.spec-select-option-question').last();
	this.waits(200);
	_el.click();
	return _el.all(by.css('.options span')).get(_number).click();
};

Maker.prototype.selectsOtherQuestion = function () {
	return this.finds('.spec-other-write-awnswer');
};

Maker.prototype.toDoLogin = function (_username = configer.get('username'), _password = configer.get('password')) {
	webpage.goTo('/login');
	this.finds('#spec-inputlogin-user').sendKeys(_username);
	this.finds('#spec-inputlogin-password').sendKeys(_password);
	this.finds('.spec-login-btn').click();
	return this.waitsFor('.spec-qrvey-logo-exp');
};

Maker.prototype.toDoRegister = function (_username = 'testingqrvey+' + randomId() + '@gmail.com', _password = '123456') {
	logger.log('register username', _username);

	webpage.goTo('/register');
	this.finds('#spec-input-useremail-register').sendKeys(_username);
	this.finds('#spec-input-userpass-register').sendKeys(_password);
	this.finds('.spec-register-btn').click();

	return this.waitsFor('.spec-qrvey-logo-exp');
};

Maker.prototype.touchesDeleteOptionMenuQrvey = function (_number = 1) {
	return this.finds('.spec-qrvey-item-' + (_number - 1)).element(by.css('.spec-touch-menu-qrvey-delete-option')).click();
};

Maker.prototype.touchesMenuQrvey = function (_number = 1) {
	return this.getsTotal('qrvey in qrveys').then(function (count) {
		if (count === 0) {

			var _el = (!isMobile) ? '.spec_dropdown_create_survey_button.dash-btn-desk' : '.spec_dropdown_create_survey_button.dash-btn-mobile';
			this.finds(_el).click();
			this.waits(2000);

			this.finds('.spec-button-create-survey').click();

			this.waits(2000);
			brw.get(brw.baseUrl);
		}

		this.finds('.spec-qrvey-item-' + (_number - 1)).element(by.css('.spec-touch-menu-qrvey')).click();
	});
};

Maker.prototype.touchsDuplicateOptionMenuQrvey = function (_number = 1) {
	return this.finds('.spec-qrvey-item-' + (_number - 1)).element(by.css('.spec-touch-menu-qrvey-duplicate-option')).click();
};

module.exports = new Maker();