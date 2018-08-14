'use strict';

var User = function () {
	this.total = null;
	this.settings = {
		idUser: '',
		validUser: '',
		validPass: '',
		invalidUser: 'ideawareqa-wrong@gmail.com',
		invalidPass: 'weloveux',
		homePage: 'http://www.qrvey.com',
		pageSleep: 500
	};

	this.getIdUser = function () {
		return this.settings.idUser;
	};

	this.getsTotals = function () {
		return this.total;
	};

	this.setTotals = function () {
		element.all(by.repeater('qrvey in qrveys')).then(function (arr) {
			this.total = arr.length;
			return arr.length;
		}, function () {
			return null;
		});
	};

	this.setSetting = function (_key, _val) {
		this.settings[_key] = _val;
	};

	this.getSetting = function (_key) {
		return this.settings[_key];
	};

	this.waits = function (_time) {
		if (typeof _time !== 'number') throw new Error('The time should be numeric');
		return brw.sleep(_time);
	};

	this.whereIAm = function () {
		return brw.getCurrentUrl();
	};

	this.deleteAllCookies = function () {
		return brw.driver.manage().deleteAllCookies();
	};

	this.getCookies = function () {
		return brw.driver.manage().getCookies();
	};

	this.refresh = function () {
		return brw.navigate().refresh();
	};

	this.goTo = function (_slug) {
		var deferred = protractor.promise.defer();
		skipSync(false);

		this.deleteAllCookies();
		brw.get(brw.baseUrl + _slug).then(function () {
			if (_slug == '/login') {
				_this.waitsFor('.spec-login-btn');
				deferred.fulfill();
			} else if (_slug == '/register') {
				_this.waitsFor('.spec-register-btn');
				deferred.fulfill();
			} else deferred.fulfill();
		});

		return deferred.promise;
	};

	this.goToHome = function () {
		var deferred = protractor.promise.defer();

		this.deleteAllCookies();
		brw.get(this.settings.homePage).then(function () {
			this.waits(500);
			deferred.fulfill();
		});

		return deferred.promise;
	};

	this.openUrl = function (_custom, _sw) {
		var deferred = protractor.promise.defer();
		var _this = this;

		if (typeof _sw === 'undefined' || _sw === false) skipSync(false);

		this.deleteAllCookies();
		brw.get(_custom).then(function () {
			_this.waits(2000);
			deferred.fulfill();
		});

		return deferred.promise;
	};

	this.navTo = function (_slug) {
		var deferred = protractor.promise.defer();
		var _this = this;

		brw.get(brw.baseUrl + _slug).then(function () {
			_this.waits(500);
			logger.log('nav to url: ', _slug);
			deferred.fulfill();
		});

		return deferred.promise;
	};

	this.validUser = function () {
		return this.settings.validUser;
	};

	this.validPass = function () {
		return this.settings.validPass;
	};

	this.invalidUser = function () {
		return this.settings.invalidUser;
	};

	this.invalidPass = function () {
		return this.settings.invalidPass;
	};

	this.toDoLogin = function (_username, _password) {
		_username = (typeof _username !== 'undefined') ? _username : configer.get('username');
		_password = (typeof _password !== 'undefined') ? _password : configer.get('password');

		this.goTo('/login');
		this.finds('#spec-inputlogin-user').sendKeys(_username);
		this.finds('#spec-inputlogin-password').sendKeys(_password);
		this.finds('.spec-login-btn').click();
		return this.waitsFor('.spec-qrvey-logo-exp');
	};

	this.toDoRegister = function (_username, _password) {
		_username = (typeof _username !== 'undefined') ? _username : 'testingqrvey+' + randomId() + '@gmail.com';
		_password = (typeof _password !== 'undefined') ? _password : '123456';

		logger.log('register username', _username);

		this.goTo('/register');
		this.finds('#spec-input-useremail-register').sendKeys(_username);
		this.finds('#spec-input-userpass-register').sendKeys(_password);
		this.finds('.spec-register-btn').click();

		return this.waitsFor('.spec-qrvey-logo-exp');
	};

	this.createsWebform = function (obj) {
		if (!_.get(obj, 'title')) obj.title = 'Name its undefined for this test qrvey';
		if (!_.get(obj, 'description')) obj.description = 'No description was defined for this test qrvey';
		if (!_.get(obj, 'type')) obj.type = 'survey';
		if (obj.type == 'form') obj.type = 'forms';

		this.finds('.spec_dropdown_create_' + obj.type + '_button').click();

		var _el = '.spec-button-create-' + obj.type;
		if (obj.type !== 'quiz') scrollIntoElement(this.finds(_el));

		this.finds(_el).click();
		this.waitsFor('.spec_title_description');
		return this.fillQrveyNameOrDescription(obj.title, 'name', obj.type);
	};

	this.editsQuery = function () {
		this.finds('.spec-create-qrvey').click();
		this.finds('.spec_create_modal_name_field').sendKeys('Product Use Satisfaction');
		this.finds('.spec_create_modal_description_field').sendKeys('Please help us to better understand your needs by completing this qrvey. Thank you for your time.');
		this.finds('.spec-button-create-survey').click();
		return this.finds('.spec-save-new-qrvey').click();
	};

	this.selectsOptionOfQuestion = function (_number) {
		_number = (_number > 0) ? _number : 0;

		var _el = this.findsAll('.spec-select-option-question').last();
		this.waits(200);
		_el.click();
		return _el.all(by.css('.options span')).get(_number).click();
	};

	this.fillQrveyNameOrDescription = function (context, field, typeQrvey) {
		var _this = this;

		return this.finds('.spec_title_description').click().then(function () {
			scrollToTop();

			_this.finds('.spec_editing_title_description input').clear().sendKeys(
				rand.getParagraph(2)
			).getAttribute('value').then(function (_val) {
				expect(_val.length).to.be.equal(36);
			});

			_this.finds('.spec_editing_title_description textarea').clear().sendKeys(
				rand.getParagraph(10)
			).getAttribute('value').then(function(_val){
				expect(_val.length).to.be.equal(176);
			});

		}).then(function () {
			if (typeQrvey == 'quiz' || typeQrvey == 'survey' || typeQrvey == 'forms') {
				if (typeQrvey == 'survey') {
					_this.finds('.question-preview-mode').click();
				} else _this.finds('.spec_edit_question_overlay').click();
			}

			if (typeQrvey == 'nps' || typeQrvey == 'checklist') user.finds('.spec-question-title').click();

			var clickQuestionName = (typeQrvey == 'nps') ? '.spec-nps-title-question-input' : '.spec-edit-question-name-any';

			if(typeQrvey == 'nps') _this.waits(300);

			_this.finds(clickQuestionName).click();
		});
	};

	this.fillMultipleChoiceQuestionFromId = function (number, title) {
		var locatorQuestionContainer = '.spec-question-container-';
		var questionContainer = this.finds(locatorQuestionContainer + number);

		questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
		questionContainer.element(by.css('.spec-multichoice-option-1')).sendKeys('Option 1');
		return questionContainer.element(by.css('.spec-multichoice-option-2')).sendKeys('Option 2');
	};

	this.fillQuestionTittleFromID = function (number, title) {
		var locatorQuestionContainer = '.spec-question-container-';
		var questionContainer = this.finds(locatorQuestionContainer + number);
		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
	};

	this.fillRankingQuestionFromId = function (number, title) {
		var locatorQuestionContainer = '.spec-question-container-';
		var questionContainer = this.finds(locatorQuestionContainer + number);

		questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
		questionContainer.element(by.css('.spec-ranking-option-1')).sendKeys('Option 1');
		return questionContainer.element(by.css('.spec-ranking-option-2')).sendKeys('Option 2');
	};

	this.fillSlideBarQuestionFromId = function (number, title) {
		var locatorQuestionContainer = '.spec-question-container-';
		var questionContainer = this.finds(locatorQuestionContainer + number);

		questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title);
		questionContainer.element(by.css('.spec-slidebar-question-type-answer-left')).sendKeys('Very Satisfied');
		return questionContainer.element(by.css('.spec-slidebar-question-type-answer-right')).sendKeys('Very Unsatisfied');
	};

	this.fillExpressionQuestionFromId = function (number, title) {
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

	this.fillImageQuestionFromId = function (number, title) {
		var locatorQuestionContainer = '.spec-question-container-';
		var questionContainer = this.finds(locatorQuestionContainer + number);
		var _this = this;

		var i = 0;
		return questionContainer.element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(function () {
			return questionContainer.all(by.css('.spec-image-upload-option-url')).each(function () {
				_this.waits(890);
				questionContainer.element(by.css('.spec-image-upload-option-url-' + i)).click();

				var _el = _this.finds('.spec-design-modal-image-url');
				var _url = 'https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png';

				_el.clear().sendKeys(_url).then(function () {
					return _el.getAttribute('value');
				}).then(function (_value) {
					expect(_value).to.be.equal(_url);
				}).then(function () {
					_this.finds('.spec-design-modal-done-button').click();
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

	this.fillQuestionDefaultFromID = function (number) {
		var locatorQuestionContainer = '.spec-question-container-';
		var questionContainer = this.finds(locatorQuestionContainer + number);
		return questionContainer.element(by.css('.spec-edit-question-name-any')).click();
	};

	this.fillQuestionByTypeAndID = function (number, typeOfQuestion) {
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

	this.addFillOptionsToQuestionID = function (numberOfOptions, questionNumber, typeOfQuestion) {
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

	this.createsMultiChoiceTypeQuestion = function (params = {}) {
		var _this = this;

		if (params.isQuiz) this.finds('.answer .right-answer input').first().click();

		return this.createsTitleForQuestion().then(function () {
			return _this.createsListOptions('multichoice');
		});
	};

	this.createsSectionQuestion = function () {
		var _this = this;

		return this.createsTitleForQuestion().then(function () {
			return _this.createsListOptions('multichoice');
		});
	};

	this.createsTitleForQuestion = function(text){
		return this.findsAll('.spec-edit-question-name-any').last().clear().sendKeys(
			rand.getParagraph(20)
		).getAttribute('value').then(function(_val){
			expect(_val.length).to.be.equal(160);
		});
	};

	this.createsListOptions = function (type) {
		var deferred = protractor.promise.defer();
		var i = 0;
		var _type = (typeof type === 'undefined') ? 'multichoice' : type;

		async.during(function (cb) {
			hasClass(_this.findsAll('.icon.q-icon-add').last(), 'disabled').then(function(_val){
				logger.log('val', !_val);
				return cb(null, !_val);
			});
		}, function (next) {
			_this.waits(400);
			_this.findsAll('.icon.q-icon-add').last().click().then(function () {
				i++;
				next();
			});
		});

		var el = null;
		_this.findsAll('.icon.q-icon-add').count().then(function(_count){
			async.times(_count, function (n, next) {
				el = _this.finds('.spec-' + _type + '-option-' + (n + 1));
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

	this.createsSlideBarQuestion = function (params = {}) {
		var _number = (typeof params._number !== 'undefined') ? params._number : 3;

		qrvey.questionType('spec_sl_qt');
		this.waits(200);

		this.createsTitleForQuestion();

		this.finds('.spec-slidebar-question-type-answer-left').sendKeys(
			rand.getParagraph(10)
		).getAttribute('value').then(function(_val){
			expect(_val.length).to.be.equal(54);
		});

		this.finds('.spec-slidebar-question-type-answer-right').sendKeys(
			rand.getParagraph(10)
		).getAttribute('value').then(function (_val) {
			expect(_val.length).to.be.equal(54);
		});

		if (_number != 3){
			this.finds('.spec-slidebar-number-option-' + _number).click();
		}

		return this.clicksOutside();
	};

	this.createsDateQuestion = function (params = {}) {
		if (params.isQuiz){
			element(by.css('.right-answer-input input')).click();
			element(by.css('.mat-calendar-body-today')).click();
		}

		qrvey.questionType('spec_da_qt');
		return this.createsTitleForQuestion().then(function () {
			return _this.clicksOutside();
		});
	};

	this.createsDropdownQuestion = function () {
		qrvey.questionType('spec_dr_qt');

		return this.createsTitleForQuestion().then(function () {
			return _this.createOptionsDropdown();
		});
	};

	this.createOptionsDropdown = function(numOpt = 9){
		var list = '';
		var index = 1;

		for (index = 1; index <= numOpt; index++) {
			list += 'Option' + index;
			if (index + 1 <= numOpt) list += '\n';
		}
		return this.finds('.dropdown-text').sendKeys(list);
	};

	this.createsNumericTypeQuestion = function (params = {}) {
		if (params.isQuiz) this.finds('.right-answer-input input').sendKeys(10);

		qrvey.questionType('spec_nu_qt');
		return this.createsTitleForQuestion();
	};

	this.activatesAllowDecimals = function () {
		return this.finds('.spec-maker-allow-decimals').click();
	};

	this.createsYesOrNotQuestion = function (params = {}) {
		if(params.isQuiz) this.finds('.spec-quiz-right-answer-Yes').click();

		qrvey.questionType('spec_yn_qt');
		return this.createsTitleForQuestion();
	};

	this.createsRatingQuestion = function () {
		qrvey.questionType('spec_rt_qt');
		return this.createsTitleForQuestion();
	};

	this.createsRankingQuestion = function (params = {}) {
		if (params.isQuiz){
			element(by.css('.spec-ranking-option-1')).sendKeys('Option 1');
			element(by.css('.spec-ranking-option-2')).sendKeys('Option 2');
		}

		qrvey.questionType('spec_rn_qt');

		return this.createsTitleForQuestion().then(function () {
			return _this.createsListOptions('ranking');
		});
	};

	this.createsNps = function () {
		this.finds('.spec_dashboard_create_new_button').click();
		this.finds('.spec_dropdown_create_nps_button').click();

		return this.finds('.spec-button-create-nps').click();
	};

	this.createsNpsQuestion = function (_nameEnterprise = '', _textfieldText = '') {
		_nameEnterprise = (_nameEnterprise != '') ? _nameEnterprise : 'QRVEY';
		_textfieldText = (_textfieldText != '') ? _textfieldText : 'Could you please explain your choice? Thank you!';

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

	this.fillsRankingQuestion = function (_titles) {
		this.createsTitleForQuestion();

		var _length = 0,
			t = 1,
			i = 0;

		_titles = (typeof _titles !== 'undefined') ? _titles : {
			'1': 'Ironman',
			'2': 'Spiderman'
		};

		_length = Object.keys(_titles).length;

		if (_length < 2) throw 'Error, the minium question is 2';

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

	this.createsTextFiledQuestion = function () {
		qrvey.questionType('spec_tf_qt');
		return this.createsTitleForQuestion();
	};

	this.createsShortTextFiledQuestion = function () {
		qrvey.questionType('spec_st_qt');
		return this.createsTitleForQuestion();
	};

	this.takesQrvey = function (_number) {
		_number = (typeof _number !== 'undefined') ? _number : 1;
		_number = _number - 1;

		return this.finds('.spec-qrvey-item-' + _number).element(by.css('.spec-qrvey-title-link')).click();
	};

	this.activatesQrvey = function () {
		this.finds('.spec-tab-to-share').click();
		return this.finds('.spec-qrvey-btn-active').click();
	};

	this.findsUrlToTaker = function () {
		var el = this.finds('.spec-qrvey-url-share');
		return el.getAttribute('value');
	};

	this.previewsQrvey = function () {
		return this.finds('.spec-design-preview-link').click();
	};

	this.isClickableAnElement = function (_selector) {
		var clickable = true;

		try {
			this.finds(_selector).click();
		} catch (e) {
			clickable = false;
		}

		return clickable;
	};

	this.forgotPassword = function (username) {
		this.finds('.spec-user-forgot-password').clear().sendKeys(username);
		return this.finds('.spec-user-forgot-password-btn').click();
	};

	this.activatesAddOtherOption = function () {
		return this.finds('.spec-active-option-add-other-option').click();
	};

	this.writesOtherAnswer = function (_question) {
		_question = (typeof _question !== 'undefined') ? _question : 'My own other answer';

		return this.finds('.spec-other-write-awnswer').sendKeys(_question);
	};

	this.activatesAllowMultipleSelections = function () {
		return this.finds('.spec-active-option-allow-multiple-selection + label').click();
	};

	this.activatesTagsOption = function () {
		return this.finds('.spec-add-tags-question').click();
	};

	this.clicksOutside = function () {
		return this.finds('body').click();
	};

	this.opensPathQuestion = function (_number) {
		_number = (typeof _number !== 'undefined') ? _number : 1;

		return this.findsAll('.spec-path-question').then(function (elements) {
			elements[_number - 1].click();
		});
	};

	this.isVisibleQuestionPath = function () {
		return this.finds('.spec-question-path').isDisplayed();
	};

	this.getsTextExists = function (_text) {
		return element.all(by.xpath('//*[contains(text(),\'' + _text + '\')]')).count().then(function (arr) {
			return (arr > 0);
		}, function () {
			return false;
		});
	};

	this.getsInputTextExists = function (_locator, _text) {
		return element.all(by.css(_locator)).filter(function (elem) {
			return elem.getAttribute('value').then(function (_val) {
				return _text.includes(_val);
			});
		}).count().then(function (length) {
			return length > 0;
		});
	};

	this.getsTotal = function (_repeat) { // 'question in qrveyObject'
		return element.all(by.repeater(_repeat)).then(function (arr) {
			return arr.length;
		}, function () {
			return null;
		});
	};

	this.getsTotalByCss = function (_class) {
		return this.findsAll(_class).count();
	};

	this.touchesMenuQrvey = function (_number) {
		_number = (typeof _number !== 'undefined') ? (_number - 1) : 0;

		return this.getsTotal('qrvey in qrveys').then(function (count) {
			if (count === 0) {

				var _el = (!isMobile) ? '.spec_dropdown_create_survey_button.dash-btn-desk' : '.spec_dropdown_create_survey_button.dash-btn-mobile';
				this.finds(_el).click();
				this.waits(2000);

				this.finds('.spec-button-create-survey').click();

				this.waits(2000);
				brw.get(brw.baseUrl);
			}

			this.finds('.spec-qrvey-item-' + _number).element(by.css('.spec-touch-menu-qrvey')).click();
		});
	};

	this.touchesDeleteOptionMenuQrvey = function (_number) {
		_number = (typeof _number !== 'undefined') ? _number : 1;
		_number = (_number - 1 < 0) ? 0 : _number - 1;

		return this.finds('.spec-qrvey-item-' + _number).element(by.css('.spec-touch-menu-qrvey-delete-option')).click();
	};

	this.deleteMesssage = function (_state) {
		_state = (typeof _state !== 'undefined') ? _state : 'confirm';

		if (_state == 'confirm') {
			return this.finds('.spec-delete-qrvey-confirm').click();
		} else if (_state == 'cancel') {
			return this.finds('.spec-delete-qrvey-cancel').click();
		}
	};

	this.touchsDuplicateOptionMenuQrvey = function (_number) {
		_number = (typeof _number !== 'undefined') ? _number : 1;
		_number = _number - 1;

		return this.finds('.spec-qrvey-item-' + _number).element(by.css('.spec-touch-menu-qrvey-duplicate-option')).click();
	};

	this.currentStateQrvey = function () {
		return this.finds('.spec-qrvey-item-0').element(by.css('.spec-qrvey-status-draft')).getInnerHtml();
	};

	this.takesQrveyShared = function () {
		return this.finds('.spec-taker-qrvey').click();
	};

	this.finds = function (_el) {
		var element = $(_el),
			isClickable = EC.presenceOf(element);

		//wait for an element to become clickable
		brw.wait(isClickable, 5000).then(function () {
			logger.log('Element -->: ' + _el + ' was displayed');
		}, function () {
			logger.log('Element -->: ' + _el + ' was not displayed');
		});

		return element;
	};

	this.isPresent = function(_el){
		return this.finds(_el).isPresent();
	};

	this.findsValue = function (_el){
		return this.finds(_el).getAttribute('value');
	};

	this.findsContainingText = function (_el, _val){
		return element(by.cssContainingText(_el, _val));
	};

	this.findsOn = function (ele) {
		var i = 0;

		return this.isDisplayed(ele).then(function (res) {
			if (res === true) {
				return element.all(by.css(ele)).each(function (item) {
					item.click().then(function () {
						logger.log('done the promise');
						i++;
					}, function () {
						logger.log('It was error');
						i++;
					});

					if (i >= 2) return item;
				});
			} else {
				logger.log('Element -->: ' + ele + ' was not displayed');

				var deferred = protractor.promise.defer();
				return deferred.reject('Element -->: ' + ele + ' was not displayed');
			}
		});
	};

	this.clicksOn = function (ele) {
		return this.findsOn(ele);
	};

	this.isDisplayed = function (e) {
		logger.log('Checking that the element ---> "' + e + '" is displayed');

		var first = element.all(by.css(e)).first(),
			last = element.all(by.css(e)).last(),
			firstVisibility = EC.visibilityOf(first),
			lastVisibility = EC.visibilityOf(last),
			AnyOfBothVisible = EC.or(firstVisibility, lastVisibility);

		return brw.wait(AnyOfBothVisible, 5000, err.elementNotFound(e)).then(function () {
			logger.log('The element: "' + e + '" was found');
			return true;
		}, function (err) {
			logger.log('The element: "' + e + '" was not found --->: ' + err);
			return false;
		});
	};

	this.findsAll = function (_el) {
		return element.all(by.css(_el));
	};

	this.findsRepeater = function (_el) {
		return element(by.repeater(_el));
	};

	this.findsAllRepeater = function (_el) {
		return element.all(by.repeater(_el));
	};

	this.findsName = function (_el) {
		return element(by.name(_el));
	};

	this.findsModel = function (_el) {
		return element(by.model(_el));
	};

	this.findsAllModel = function (_el) {
		return element.all(by.model(_el));
	};

	this.findsClassName = function (_el) {
		return element(by.className(_el));
	};

	this.findsLinkText = function (_el) {
		return element(by.linkText(_el));
	};

	this.findsJs = function (_function) {
		return element(by.js(_function));
	};

	this.findsBinding = function (_el) {
		return element(by.binding(_el));
	};

	this.findsXpath = function (_el) {
		return element(by.xpath(_el));
	};

	this.getText = function (_el) {
		return this.finds(_el).getText();
	};

	this.choicesAnswer = function (_type) {
		var _this = this;

		if (_type == 'multiple') {
			return this.finds('.spec-multiple-choise-option-0').click();
		} else if (_type == 'no' || _type == 'yes') {
			var _el = '.spec-answer-yesno-question-option-' + _type;
			return this.finds(_el).click().then(function () {
				expect(_this.finds(_el).getAttribute('checked')).to.eventually.be.equal('true');
			});
		} else logger.log('Error, It doesn\'t exists it parameter');
	};

	this.choicesRightAnswer = function (_type, _idx) {
		var deferred = protractor.promise.defer();
		var _el = null;

		this.waits(700);
		// this.waitsFor('.question-number');

		if (_type == 'SINGLE_CHOICE') {

			this.waitsFor('.spec-multiple-choise-option-0');
			this.finds('.spec-multiple-choise-option-0').click();
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else if (_type == 'YES_NO') {

			_el = this.finds('.spec-answer-yesno-question-option-yes');
			_el.click().then(function () {
				expect(_el.getAttribute('checked')).to.eventually.be.equal('true');
			});
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else if (_type == 'NUMERIC') {

			this.finds('.spec-taker-answer-numeric-question-read').sendKeys('10');
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else if (_type == 'DATE') {

			_el = this.finds('.spec-taker-date-answer-input');

			_el.click();
			element.all(by.css('[data-date="' + new Date().getDate() + '"].-current-')).click().then(function () {
				expect(_el.getAttribute('value')).to.eventually.be.equal(getDateFormat(new Date()));
			});
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else if (_type == 'EMAIL') {

			this.waitsFor('.textfield-area.requested-email');
			this.finds('.textfield-area.requested-email').sendKeys('testingqrvey+' + randomId() + '@gmail.com');
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else {
			deferred.reject('Error, It doesn\'t exists it parameter');
			logger.log('Error, It doesn\'t exists it parameter');
		}

		return deferred.promise;
	};

	this.choicesRandomAnswer = function (_type, _idx) {
		var deferred = protractor.promise.defer();
		var _el = null;
		var answer = null;

		this.waits(700);
		// this.waitsFor('.question-number');

		if (_type == 'SINGLE_CHOICE') {
			answer = chance.integer({ min: 0, max: 4 });

			logger.info('.spec-multiple-choise-option-' + answer);

			this.finds('.spec-multiple-choise-option-' + answer).click();
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else if (_type == 'YES_NO') {
			answer = chance.pickone(['yes', 'no']);

			_el = this.finds('.spec-answer-yesno-question-option-' + answer);
			_el.click().then(function () {
				expect(_el.getAttribute('checked')).to.eventually.be.equal('true');
			});
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else if (_type == 'NUMERIC') {
			answer = chance.integer({ min: 0, max: 10 });

			this.finds('.spec-taker-answer-numeric-question-read').sendKeys(answer);
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else if (_type == 'DATE') {
			answer = chance.date({
				string: true,
				american: true,
				month: new Date().getMonth(),
				year: new Date().getFullYear()
			});

			logger.info('DATE', answer);
			// logger.info('typeof answer.toDate()', typeof answer.toDate());
			// logger.info('answer.toDate()', answer.toDate());
			// logger.info('answer.toDate().getDate()', answer.toDate().getDate());

			// brw.enterRepl();

			this.waitsFor('.spec-taker-date-answer-input');

			_el = this.finds('.spec-taker-date-answer-input');

			var newFormat = getDateFormat(answer);
			logger.info('choicesRandomAnswer', newFormat);
			var newDate = toDate(newFormat).getDate();

			_el.click();
			this.findsAll('[data-date="' + newDate + '"]').get(0).click().then(function () {
				logger.warn('choicesRandomAnswer', newDate);
				logger.warn('choicesRandomAnswer', newFormat);
				expect(_el.getAttribute('value')).to.eventually.be.equal(getDateFormat(newFormat));
			});
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else if (_type == 'EMAIL') {

			this.finds('.textfield-area.requested-email').sendKeys('testingqrvey+' + randomId() + '@gmail.com');
			this.findsAll('.spec-user-response-ok').get(_idx).click().then(function () {
				deferred.fulfill();
			});

		} else {
			deferred.reject('Error, It doesnt exists it parameter');
			logger.error('Error', 'It doesnt exists it parameter');
		}

		return deferred.promise;
	};

	this.takerClicksOnOk = function () {
		scrollToBottom();
		return this.finds('.spec-user-response-ok').click();
	};

	this.takerFinish = function (_confirm) {
		_confirm = (typeof _confirm !== 'undefined') ? _confirm : true;

		if (_confirm === true) {
			this.waitsFor('.spec-user-email-field-confirm');
			this.finds('.spec-user-email-field-confirm').sendKeys(configer.get('username'));
			this.waits('.spec-done-submit-take-qrvey');
			this.finds('.spec-done-submit-take-qrvey').click().then(function () {
				skipSync(false);
				return _this.waits(2000);
			});
		} else if (_confirm === false) {
			this.finds('.spec-failed-submit-take-qrvey').click();
			return this.waits(300);
		}
	};

	this.selectsOtherQuestion = function () {
		return this.finds('.spec-other-write-awnswer');
	};

	this.touchsMultipleAnswers = function (numberOfAnswers) {
		var deferred = protractor.promise.defer();
		var _this = this;

		async.times(numberOfAnswers, function (n, next) {
			_this.finds('.spec-multiple-choise-option-multi-' + n).click();
			_this.waits(500).then(function () {
				next();
			});
		}, function () {
			deferred.fulfill();
		});

		return deferred.promise;
	};

	this.movesSlidebar = function (_distance) {
		var _el = this.findsAll('.rz-pointer').first();

		brw.actions().mouseDown(_el).perform();
		this.waits(2000);
		return brw.actions().mouseMove(_el, {
			x: _distance,
			y: 0
		}).perform();
	};

	this.answersDateQuestionByText = function (_date) {
		return this.finds('.spec-taker-date-answer-input').sendKeys(_date);
	};

	this.answersDateQuestionByClick = function (_day) {
		if (!isMobile) {
			this.finds('.spec-taker-date-answer-input').click();
			return this.findsAll('[data-date="' + _day + '"]').first().click();
		} else return this.finds('.spec-taker-date-answer-input-mobile').sendKeys('01042016');
	};

	this.answersDateQuestion = function () {
		var today = new Date(),
			_day = today.getDate();

		logger.log('_day', _day);

		if (!isMobile) {
			logger.log('NO es mobile');
			this.finds('.spec-taker-date-answer-input').click();
			return this.findsAll('[data-date="' + _day + '"]').first().click();
		} else return this.finds('.spec-taker-date-answer-input-mobile').sendKeys('01042016');
	};

	this.answersNumericQuestion = function (_value) {
		skipSync(true);

		this.finds('.spec-taker-answer-numeric-question-read').click();
		return this.finds('.numeric-input-number').sendKeys(_value);
	};

	this.answersYesNoQuestion = function () {
		var options = ['yes', 'no'];
		return this.choicesAnswer(options[Math.floor(Math.random() * options.length)]);
	};

	this.answersNumericQuestionWithoutMask = function (_value) {
		return this.finds('.spec-taker-answer-numeric-question').sendKeys(_value);
	};

	this.answersNumericQuestionNoMask = function (_value) {
		this.finds('.spec-taker-answer-numeric-question').click();
		return this.finds('.numeric-input-number').sendKeys(_value);
	};

	this.addsNewQuestion = function () {
		this.finds('.spec-design-add-state').click();
		return this.finds('.spec-design-add-new-question').click();
	};

	this.makerMovesQuestion = function (_where, _number) {
		_where = (typeof _where !== 'undefined') ? _where : 'up';
		_number = (typeof _number !== 'undefined') ? (_number - 1) : 0;

		var _dir = (_where == 'up') ? { x: 0, y: 500 } : { x: 0, y: -500 },
			_el = this.finds('.spec-maker-move-question-' + _number);

		brw.actions().mouseDown(_el).perform();
		this.waits(2000);
		brw.actions().mouseMove(_el, _dir).perform();
		return brw.actions().mouseUp().perform();
	};

	this.takerTouchStarts = function () {
		var any = rand.getNumber({
			min: 0,
			max: 4
		});

		return this.finds('.spec-taker-rating-select-' + any).click();
	};

	this.waitsFor = function (_class, idx) {
		idx = (typeof idx !== 'undefined') ? idx : 0;
		var timeout = (rootServer !== 'browserstack') ? 50000 : 50000;
		var _el = element.all(by.css(_class)).get(idx);

		logger.info('starting to waitsFor...', _class);

		return brw.wait(EC.visibilityOf(_el), timeout, 'Error: the element "' + _class + '" was not found.');
	};

	this.waitsForWidgets = function (_class) {
		brw.switchTo().frame(this.findsAll('#iframe-icf').getWebElement()).then(function () {
			var timeout = (rootServer !== 'browserstack') ? 30000 : 160000;
			var _el = this.findsAll(_class);

			return brw.wait(EC.visibilityOf(_el), timeout, 'Error: the element "' + _class + '" was not found.');
		});
	};

	this.waitsForElement = function (_el) {
		var time = (rootServer !== 'browserstack') ? 10000 : 30000;
		var isDisplayed = EC.visibilityOf(_el);
		return brw.wait(isDisplayed, time);
	};

	this.waitForElement = function (_el) {
		var time = (rootServer !== 'browserstack') ? 20000 : 30000;

		var isDisplayed = EC.visibilityOf(_el);
		return brw.wait(isDisplayed, time);
	};

	this.waitsForPresence = function (_el) {
		var time = 10000;

		_el = element.all(by.css(_el)).get(0);

		var isPresent = EC.presenceOf(_el);
		return brw.wait(isPresent, time);
	};

	this.waitsElementPresence = function (_el) {
		var time = 10000;

		var isPresent = EC.presenceOf(_el);
		return brw.wait(isPresent, time);
	};

	this.waitsForClickeable = function (_el) {
		var time = 10000;

		_el = element.all(by.css(_el)).get(0);

		var isPresent = EC.elementToBeClickable(_el);
		return brw.wait(isPresent, time);
	};

	this.goBack = function () {
		return brw.navigate().back();
	};

	this.goToTaken = function () {
		this.waits(2000);
		return this.finds('.spec_taken_qrveys_button').click();
	};

	this.search = function (_text) {
		this.finds('.spec_search_input').sendKeys(_text);
		return this.waits(2000);
	};

	this.actionSearch = function () {
		this.finds('.spec_search_input').sendKeys(protractor.Key.ENTER);
		return this.waits(2000);
	};

	this.findsText = function (_el) {
		return this.finds(_el).getAttribute('value');
	};

	this.answersNpsQuestion = function () {
		var num = rand.getNumber({ min: 0, max: 10 }),
			_el = this.finds('.spec-nps-answers-number-' + num);

		return _el.click().then(function () {
			logger.log('Click');
			_el.getAttribute('value').then(function (_value) {
				logger.log('the value is ' + _value);
				expect(+_value).to.be.equal(num);
			});
		});
	};

	this.answersDropdownQuestion = function () {
		this.finds('.spec-taker-dropdown-select').click();
		return this.finds('.spec-taker-dropdown-option-1').click();
	};

	this.answersTextFieldQuestion = function () {
		var _text = rand.getText(177);
		this.waits(1300);

		var _textArea = this.finds('.spec-nps-answers-textfield');
		_textArea.sendKeys(_text);

		return _textArea.getAttribute('value').then(function (_mytext) {
			expect(_mytext.length).to.be.equal(176);
		});
	};

	this.createsPolling = function (_title, _description) {
		_title = (typeof _title !== 'undefined') ? _title : 'NPS Survey in Qrvey';
		_description = (typeof _description !== 'undefined') ? _description : 'NPS Survey in Qrvey';

		this.finds('.spec_dashboard_create_new_button').click();
		this.finds('.spec_dropdown_create_polling_button').click();

		this.finds('.spec-input-new-polling-name').sendKeys(_title);
		this.finds('.spec-input-new-polling-description').sendKeys(_description);
		return this.finds('.spec-button-create-polling').click();
	};

	this.putCodeInAudiencePage = function (_code) {
		if (typeof _code === 'undefined') throw 'Error, lack the code';

		logger.log('the code is:', _code);
		return this.finds('.spec_audiencepage_enter_access_code_input').sendKeys(_code);
	};

	this.enterInAudicencePage = function () {
		return this.finds('.spec_audiencepage_begin_poll_button').click();
	};

	this.deteleAllQrveys = function () {
		var deferred = protractor.promise.defer();

		this.waits(50).then(function () {
			logger.log('Deleted all qrveys');
			deferred.fulfill();
		});

		return deferred.promise;
	};

	this.addImageOptions = function (_all_images_possible) {
		var deferred = protractor.promise.defer(),
			all_images_possible = (typeof _all_images_possible == 'undefined') ? 3 : _all_images_possible, // start with 0
			el = element.all(by.css('.spec-add-option-image-question')).last();

		async.times(all_images_possible, function (n, next) {
			scrollIntoElement(el, function () {
				el.click();
				this.waits(100);

				next();
			});
		}, function (err) {
			if (err) throw err;
			deferred.fulfill();
		});

		return deferred.promise;
	};

	this.addImageTitles = function () {
		var deferred = protractor.promise.defer(),
			_title = null,
			maxNum = 16;

		this.findsAll('.spec-design-image-title').count().then(function (num) {
			var i = 0;

			async.times(num, function (n, next) {
				i = n + 1;
				_title = rand.getText(maxNum);

				_this.finds('.spec-design-image-title-' + i).sendKeys(_title).getAttribute('value').then(function (_text) {
					logger.log('text1', _title);
					logger.log('text2', _text);

					expect(_title.slice(0, -1)).to.be.equal(_text);
					expect(_text.length).to.be.equal(15);

					next();
				});
			}, function (err) {
				if (err) throw err;
				deferred.fulfill();
			});
		});

		return deferred.promise;
	};

	this.createsImageQuestion = function (params = {}) {
		var deferred = protractor.promise.defer(),
			_this = this,
			count = 0;

		if (typeof params.typeOfInput === 'undefined') params.typeOfInput = 'url';

		this.createsTitleForQuestion();

		async.during(function (cb) {
			_this.finds('.spec-add-option-image-question').isDisplayed().then(function (_displayed) {
				return cb(null, _displayed);
			}).catch(function(){
				return cb(null, false);
			});
		}, function (next) {
			_this.finds('.spec-add-option-image-question').click();
			next();
		}, function (err) {
			if(err) throw err;
		});

		var n = 0;

		_this.findsAll('.spec-image-upload-option-url').count().then(function (_count) {
			count = _count;

			logger.log('params.typeOfInput', params.typeOfInput);

			if (params.typeOfInput == 'url') {
				logger.log('by URL');

				scrollToTop();

				async.times(count, function (n, next) {
					var _url = 'https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png';
					var el = _this.finds('.spec-image-upload-option-url-' + n);

					el.click();

					_this.finds('.spec-design-modal-image-url').clear().sendKeys(_url).getAttribute('value').then(function (_value) {
						expect(_value).to.be.equal(_url);

						_this.finds('.spec-design-modal-done-button').click().then(function(){
							return _this.waits(500);
						}).then(function(){
							if (params.isQuiz){
								return _this.findsAll('.spec-quiz-right-answer + input:not(.spec-quiz-right-answer)').get(n).sendKeys(
									rand.getWord(5)
								);
							} else {
								return _this.findsAll('.label-container input').get(n).sendKeys(
									rand.getWord(5)
								);
							}
						}).then(function () {
							logger.log('Finish log');

							_this.waits(500);
							logger.log('i', n);
							next();
						});
					});
				}, function (err) {
					if (err) throw err;
					else logger.log('completed');

					deferred.fulfill();
				});
			} else if (params.typeOfInput == 'desktop') {

				// var i = n + 1;
				// var num = 100 + (i >= 6 ? i * 10 : i * 3);

				// scrollIntoElement(el, function () {
				// 	// scrollAxisY(num.toString());
				// 	el.click();
				// 	_this.waits(100);
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

		// 			var _el = _this.finds('.spec-design-modal-image-url');
		// 			var _url = 'https://automatedqastg.qrvey.com/images/icn/logo-qrvey.png';
		// 			var el = _this.finds('.spec-image-upload-option-url-' + i);
		// 			el.click();

		// 			_el.clear().sendKeys(_url).getAttribute('value').then(function (_value) {
		// 				expect(_value).to.be.equal(_url);

		// 				_this.finds('.spec-design-modal-done-button').click().then(function () {
		// 					logger.log('Finish log');

		// 					_this.waits(500);
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
		// 			var _el = _this.finds('.spec-image-upload-option-desktop-' + i); //start in 0
		// 			logger.log('i', i);
		// 			logger.log(absolutePath);

		// 			_el.sendKeys(absolutePath);
		// 			var _ele = element.all(by.css('.image-container img')).get(i);

		// 			_this.waitsElementPresence(_ele);

		// 			_ele.getAttribute('src').then(function (_text) {
		// 				expect(_text).to.not.be.equal('');
		// 				_this.waits(900);
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

	this.createsExpressionQuestion = function () {
		qrvey.questionType('spec_ex_qt');
		this.waits(200);
		this.fillExpressionQuestionAnswers();
		return this.createsTitleForQuestion();
	};

	this.fillExpressionQuestionAnswers = function (num, type) {
		var deferred = protractor.promise.defer();
		var word = null;
		var _this = this;
		var _el = (typeof type === 'undefined') ? '.spec_input_expression_word' : '.spec_input_' + type + '_expression_word';

		async.times(num, function (n, next) {
			word = rand.getWord();

			logger.log('word', word);

			_this.finds(_el).sendKeys(word + ' ');
			brw.actions().sendKeys(protractor.Key.ENTER).perform();

			next();
		}, function () {
			deferred.fulfill();
		});

		return deferred.promise;
	};

	this.createsTextFieldQuestion = function (params = {}) {
		if (params.isQuiz) this.finds('.answer input').sendKeys('question');
		return this.createsTitleForQuestion();
	};

	this.createsQuestionByType = function (_type, _isQuiz) {
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

	this.createsIncontext = function (_title, _description) {
		_title = (typeof _title !== 'undefined') ? _title : 'In Context in Qrvey';
		_description = (typeof _description !== 'undefined') ? _description : 'In Context in Qrvey';

		this.finds('.spec_dashboard_create_new_button').click();
		this.finds('.spec_dropdown_create_incontextfeedback_button').click();

		this.finds('.spec-input-new-incontext-name').sendKeys(_title);
		this.finds('.spec-input-new-incontext-description').sendKeys(_description);
		return this.finds('.spec-button-create-incontext').click();
	};

	this.createsProcess = function (_title, _description) {
		this.finds('.spec_workflows_button').click();
		this.finds('#spec_new_process').click();

		_title = (typeof _title !== 'undefined') ? _title : 'Name its undefined for this process qrvey';
		_description = (typeof _description !== 'undefined') ? _description : 'No description was defined for this test qrvey';

		this.finds('.spec-input-new-process-name').sendKeys(_title);
		this.finds('.spec-input-new-process-description').sendKeys(_description);

		return this.finds('.spec-button-create-process').click();
	};

	this.closesOtherWindows = function () {
		return brw.getAllWindowHandles().then(function (handles) {
			logger.log('handles', handles);

			if (handles.length > 1) {
				async.times(handles.length - 1, function (n, next) {
					brw.switchTo().window(handles[n - 1]).then(function () {
						brw.close(); //close the current brw
						next();
					});
				});
			}
		});
	};

	this.changeWindow = function (index) {
		return brw.getAllWindowHandles().then(function (handles) {
			logger.log('handles', handles);
			return brw.switchTo().window(handles[index]);
		});
	};

	this.answersMultipleChoiceQuestion = function () {
		return this.choicesAnswer('multiple');
	};

	this.answersSlidebarQuestion = function () {
		return this.movesSlidebar(2000);
	};

	this.answersShortTextQuestion = function () {
		var text = rand.getText(256);
		return this.finds('.spec-taker-short-text-answers').sendKeys(text);
	};

	this.answersShortTextQuestionWidget = function () {
		var text = rand.getText(256);
		return this.finds('.textfield-area').sendKeys(text);
	};

	this.answersLongTextQuestion = function () {
		var text = rand.getText(500);
		return this.finds('.spec-taker-long-text-answers').sendKeys(text);
	};

	this.answersPasswordQuestion = function () {
		return this.finds('.spec-taker-onlineform-password-input').sendKeys('passwordtest');
	};

	this.answersPasswordConfirmQuestion = function () {
		this.finds('.spec-taker-onlineform-password-input').sendKeys('passwordtest');
		return this.finds('.spec-taker-onlineform-confirmpass-input').sendKeys('passwordtest');
	};

	this.answersPaymentsQuestion = function () {
		this.finds('.payment-info.payment-info-number').sendKeys('424242424242424242');
		this.finds('.payment-info.payment-info-exp').sendKeys('12/20');
		return this.finds('.payment-info.payment-info-cvc').sendKeys('1234');
	};

	this.answersExpressionQuestion = function () {
		var el = '.spec-expression-word-check';
		var _this = this;
		this.waitsForPresence(el);

		return this.findsAll('.spec-expression-word-check').count().then(function (_count) {
			var index = rand.getNumber({
				min: 1,
				max: (_count > 1) ? _count - 1 : 1,
				float: false
			});
			logger.log('index:', index);
			_this.findsAll('.spec-expression-word-check').get(index).click();
		});
	};

	this.answersExpressionWithCategoriesQuestion = function () {
		var el = '.faces-cat',
			num = 0,
			el2 = '',
			index = rand.getNumber({
				min: 0,
				max: 1,
				float: false
			});

		this.findsAll(el).get(index).click();

		el2 = '.expression-words:nth-child(' + (index == 0 ? 'odd' : 'even') + ') .word-check';

		this.waitsFor(el2);
		var _this = this;

		return this.findsAll(el2).count().then(function (_count) {
			num = rand.getNumber({
				min: 0,
				max: (_count > 1) ? _count - 1 : 1,
				float: false
			});
			_this.findsAll(el2).get(num).click();
		});
	};

	this.answersImageQuestion = function (num) { /* To review */
		var deferred = protractor.promise.defer();
		var array = [];
		var sw = false;

		num = (typeof num === 'undefined') ? 1 : num;

		this.findsAll('.list-answers-multiple').count().then(function (_count) {
			async.times(num, function (n, next) {
				sw = false;

				while (!sw) {
					num = rand.getNumber({
						float: false,
						min: 0,
						max: _count - 1
					});

					if (_.size(array) == _count) deferred.fulfill();

					if (!_.includes(array, num)) {
						sw = true;
						array.push(num);

						this.findsAll('.list-answers-multiple').get(num).click();
						next();
					}
				}
			}, function () {
				deferred.fulfill();
			});
		});

		return deferred.promise;
	};

	this.answersRatingQuestion = function () {
		return this.takerTouchStarts();
	};

	this.answersAddressQuestion = function () {
		var _el = '.spec-taker-onlineform-addressquestion-';

		this.finds(_el + 'address-input').clear().sendKeys('Calle 74');
		this.finds(_el + 'city-input').clear().sendKeys('Barranquilla');
		this.finds(_el + 'state-input').clear().sendKeys('Atlantico');
		this.finds(_el + 'postal-code-input').clear().sendKeys('018000');
		return this.finds(_el + 'contry-input').clear().sendKeys('Colombia');
	};

	this.answersNameQuestion = function () {
		this.finds('.spec-taker-onlineform-namequestion-name-input').sendKeys('Name Random');
		return this.finds('.spec-taker-onlineform-namequestion-lastname-input').sendKeys('Email Random');
	};

	this.answersEmailQuestion = function () {
		var _email = rand.getEmail();
		return this.finds('.spec-taker-onlineform-emailquestion-input').sendKeys(_email);
	};

	this.answersUsAddressQuestion = function () {
		var _el = '.spec-taker-onlineform-emailquestion-';

		this.finds(_el + 'address-1-input').sendKeys('Calle 74');
		this.finds(_el + 'address-2-input').sendKeys('Calle 73');
		this.finds(_el + 'city-input').sendKeys('Barranquilla');
		this.finds(_el + 'state-select .selected').click();
		this.findsAll(_el + 'state-select .states span').get(1).click();
		return this.finds(_el + 'postal_code-input').sendKeys('018000');
	};

	this.answersPhoneNumberQuestion = function () {
		var _phone = rand.getPhone();

		logger.log('input phone', _phone);

		return this.finds('.spec-taker-onlineform-numberquestion-input').sendKeys(_phone);
	};

	this.answersLookupQuestion = function (type) {
		var _max = (type == 'lookup_webhook') ? 10 : 5;
		var number = rand.getNumber({
			min: 1,
			max: _max
		});

		logger.log('option number', number);

		this.waits(500);
		this.finds('.spec-taker-lookup-select').click();
		return this.finds('.spec-taker-lookup-option-' + number).click();
	};

	this.answersQuestion = function (typeOfQuestion) {
		var deferred = protractor.promise.defer();
		deferred.fulfill();

		var _val = null; // eslint-disable-line

		switch (typeOfQuestion) {
			case 'dropdown':
				this.answersDropdownQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'nps':
				this.answersNpsQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'textfield':
				this.answersTextFieldQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'date':
				this.answersDateQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'multiple choice':
			case 'multiple_choice':
			case 'multiple-choice':
				this.answersMultipleChoiceQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'slide bar':
			case 'slide_bar':
				this.answersSlidebarQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'numeric':
				_val = rand.getNumber({
					min: 1,
					max: 200,
					float: false
				});
				this.answersNumericQuestionWithoutMask(_val).then(function () {
					deferred.fulfill();
				});
				break;
			case 'short text':
			case 'short_text':
				this.answersShortTextQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'short_text-widget':
				this.answersShortTextQuestionWidget().then(function () {
					deferred.fulfill();
				});
				break;
			case 'expression':
				this.answersExpressionQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'expression_with_categories':
				this.answersExpressionWithCategoriesQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'image':
				_val = rand.getNumber({
					min: 1,
					max: 15
				});
				this.answersImageQuestion(_val).then(function () {
					deferred.fulfill();
				});
				break;
			case 'rating':
				this.answersRatingQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'ranking':
				this.answersRankingQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'long text':
			case 'long_text':
				this.answersLongTextQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'numeric-mask':
				_val = rand.getNumber({
					min: 1,
					max: 200
				});
				this.answersNumericQuestion(_val).then(function () {
					deferred.fulfill();
				});
				break;
			case 'yes-no':
			case 'yes_no':
				this.answersYesNoQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'email':
				this.answersEmailQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'name':
				this.answersNameQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'address':
				this.answersAddressQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'phone':
			case 'phone-number':
			case 'phone_number':
				this.answersPhoneNumberQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'us_address':
			case 'us-address':
				this.answersUsAddressQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'lookup_text':
			case 'lookup_google':
			case 'lookup_webhook':
				this.answersLookupQuestion(typeOfQuestion).then(function () {
					deferred.fulfill();
				});
				break;
			case 'password':
				this.answersPasswordQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'password_confirm':
				this.answersPasswordConfirmQuestion().then(function () {
					deferred.fulfill();
				});
				break;
			case 'payments':
				this.answersPaymentsQuestion().then(function () {
					deferred.fulfill();
				});
				break;
		}

		return deferred.promise;
	};

	this.selectTemplate = function (_category) {
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

	this.createsPages = function (action) {
		var deferred = protractor.promise.defer();

		this.findsAll('.spec_pages_button').first().click();
		this.finds('#spec_new_page').click();
		this.finds('.spec-input-new-process-name').clear().sendKeys(rand.getSentence(5));
		this.finds('.spec-button-create-process').click();

		this.waitsFor('.spec-automatiq-block-action-view-open');
		this.findsAll('.spec-automatiq-block-action-view-open').get(0).click();
		this.findsAll('.spec-automatiq-select-action-open').get(0).click();
		this.findsAll('.spec-automatiq-select-action-' + action).get(0).click();

		if (action === 'showmsg') {
			this.finds('.spec-automatiq-show-message input').sendKeys(rand.getSentence(10));
			this.finds('.spec-automation-btn-activate').click();

			this.waitsFor('.toggle');
			this.findsAll('.pages-list.qrvey-list.qrvey-pages-list .page .toggle').first().click();

			deferred.fulfill();
		} else throw 'The action is not supported yet';

		return deferred.promise;
	};

	this.createPage = function () {
		this.finds('#spec_new_page').click();
		this.finds('.spec-input-new-process-name').clear().sendKeys(rand.getSentence(5));
		this.finds('.spec-input-new-process-description').clear().sendKeys(rand.getSentence(15));
		return this.finds('.spec-button-create-process').click();
	};

	this.createPageWithTitle = function (title) {
		this.finds('.spec_pages_create_new_button').click();
		this.finds('.spec-input-new-process-name').clear().sendKeys(title);
		this.finds('.spec-input-new-process-description').clear().sendKeys(rand.getSentence(15));
		return this.finds('.spec-button-create-process').click();
	};

	//this.createsActionToPage = function(_to, _subject, _message, _attach_results, _insertQrvey, typeOfQrvey) {
	this.createsActionToPage = function (_typeOfAction, typeOfQrvey, _view) {
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

	this.deleteAnDashboard = function (_appID) {
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

	this.addNewToken = function (typeToken) {
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

	this.getTypeQuestionOnTaker = function (idx) {
		var defer = protractor.promise.defer();

		user.waits(500);
		user.findsAll('[data-qtype]').get(idx).getAttribute('data-qtype').then(function (_type) {
			defer.fulfill(_type);
		});

		return defer.promise;
	};

	this.getQuizStatus = function () {
		var defer = protractor.promise.defer();

		user.finds('.circle').getAttribute('class').then(function (_classes) {
			var newValue = _classes.replace('circle', '').trim();

			defer.fulfill(newValue);

			// if (newValue == 'passed') logger.info('Status', 'PASASTES');
			// else if (newValue == 'not-passed') logger.info('Status', 'PERDISTES');
		});

		return defer.promise;
	};

	this.answerAllOnTaker = function (rightAnswers) {
		var defer = protractor.promise.defer();
		var idx = 0;
		var _this = this;

		rightAnswers = (typeof rightAnswers !== 'undefined') ? rightAnswers : true;

		async.during(function (cb) {

			_this.waits(400);

			_this.findsAll('.spec-user-response-ok').get(idx).isDisplayed().then(function (_isDisplayed) {
				logger.warn('Displayed:', _isDisplayed);
				return cb(null, _isDisplayed);
			}).catch(function (err) {
				if (err.name !== 'NoSuchElementError' && err.name !== 'StaleElementReferenceError') {
					logger.error('ERROR', err);
					deferred.reject(err);
				}

				defer.fulfill();
			});

		}, function (next) {

			logger.info('IDX', idx);

			_this.getTypeQuestionOnTaker(idx).then(function (_type) {
				logger.info('type', _type);

				if (rightAnswers) return _this.choicesRightAnswer(_type, idx);
				else return _this.choicesRandomAnswer(_type, idx);
			}).then(function () {

				idx++;
				next();

			}).catch(function (err) {
				if (err.name !== 'NoSuchElementError' && err.name !== 'StaleElementReferenceError') {
					logger.error('ERROR', err);
					throw err;
				}
			});

		}, function (err) {
			if(err) defer.reject();
			defer.fulfill();
		});

		return defer.promise;
	};

	this.selectQuestionFromDropdown = function (typeOfQuestion){
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
		}).then(function(){
			defer.fulfill();
		});

		return defer.promise;
	};

	this.getQuestionType = function(){
		var defer = protractor.promise.defer();

		element(by.css('.question-type-selector')).getText().then(function(_text){
			defer.fulfill(_text.toLowerCase());
		});

		return defer.promise;
	};

	this.isQuizOnMaker = function(){
		var defer = protractor.promise.defer();

		this.getsTextExists('Quiz').then(function(_val){
			console.log('isQuizOnMaker', _val);
			defer.fulfill(_val);
		});

		return defer.promise;
	};

	this.buildQuestion = function (type){
		var defer = protractor.promise.defer();
		var _this = this;

		if (type !== 'checklist' && type !== 'nps'){
			this.selectQuestionFromDropdown(type).then(function () {
				return _this.isQuizOnMaker();
			}).then(function (_isQuizOnMaker) {
				return _this.createsQuestionByType(type, _isQuizOnMaker);
			}).then(function () {
				defer.fulfill();
			});
		} else {
			this.isQuizOnMaker().then(function (_isQuizOnMaker) {
				return _this.createsQuestionByType(type, _isQuizOnMaker);
			}).then(function () {
				defer.fulfill();
			});
		}

		return defer.promise;
	};

	this.addIntroPage = function () {
		this.findsAll('.spec-design-add-state').first().click();
		this.finds('.spec-design-add-intro').click();
		this.finds('#form_intro_title').clear().sendKeys(rand.getParagraph(4));
		this.finds('#form_intro_content').clear().sendKeys(rand.getParagraph(20));
		this.finds('#form_intro_button').clear().sendKeys(rand.getParagraph(1));
		return this.finds('#form_intro_title').click();
	};

	this.publishWebform = function () {
		this.finds('.spec-tab-to-share').click();
		return this.finds('.spec-qrvey-btn-active').click();
	};
};

module.exports = new User();