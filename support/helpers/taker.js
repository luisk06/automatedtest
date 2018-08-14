'use strict';

var Taker = function () {};

Taker.prototype = User.prototype;
Taker.prototype.constructor = Taker;

Taker.prototype.answerAll = function (rightAnswers) {
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
				throw new Error(err);
			}
		});

	}, function (err) {
		if (err) defer.reject();
		defer.fulfill();
	});

	return defer.promise;
};

Taker.prototype.answersAddressQuestion = function () {
	var _el = '.spec-taker-onlineform-addressquestion-';

	this.finds(_el + 'address-input').clear().sendKeys('Calle 74');
	this.finds(_el + 'city-input').clear().sendKeys('Barranquilla');
	this.finds(_el + 'state-input').clear().sendKeys('Atlantico');
	this.finds(_el + 'postal-code-input').clear().sendKeys('018000');
	return this.finds(_el + 'contry-input').clear().sendKeys('Colombia');
};

Taker.prototype.answersDateQuestion = function () {
	var today = new Date(),
		_day = today.getDate();

	logger.log('_day', _day);

	if (!isMobile) {
		logger.log('NO es mobile');
		this.finds('.spec-taker-date-answer-input').click();
		return this.findsAll('[data-date="' + _day + '"]').first().click();
	} else return this.finds('.spec-taker-date-answer-input-mobile').sendKeys('01042016');
};

Taker.prototype.answersDateQuestionByClick = function (_day) {
	if (!isMobile) {
		this.finds('.spec-taker-date-answer-input').click();
		return this.findsAll('[data-date="' + _day + '"]').first().click();
	} else return this.finds('.spec-taker-date-answer-input-mobile').sendKeys('01042016');
};

Taker.prototype.answersDateQuestionByText = function (_date) {
	return this.finds('.spec-taker-date-answer-input').sendKeys(_date);
};

Taker.prototype.answersDropdownQuestion = function () {
	this.finds('.spec-taker-dropdown-select').click();
	return this.finds('.spec-taker-dropdown-option-1').click();
};

Taker.prototype.answersEmailQuestion = function () {
	var _email = rand.getEmail();
	return this.finds('.spec-taker-onlineform-emailquestion-input').sendKeys(_email);
};

Taker.prototype.answersExpressionQuestion = function () {
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

Taker.prototype.answersExpressionWithCategoriesQuestion = function () {
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

Taker.prototype.answersImageQuestion = function (num) { /* To review */
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

Taker.prototype.answersLongTextQuestion = function () {
	var text = rand.getText(500);
	return this.finds('.spec-taker-long-text-answers').sendKeys(text);
};

Taker.prototype.answersLookupQuestion = function (type) {
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

Taker.prototype.answersMultipleChoiceQuestion = function () {
	return this.choicesAnswer('multiple');
};

Taker.prototype.answersNameQuestion = function () {
	this.finds('.spec-taker-onlineform-namequestion-name-input').sendKeys('Name Random');
	return this.finds('.spec-taker-onlineform-namequestion-lastname-input').sendKeys('Email Random');
};

Taker.prototype.answersNpsQuestion = function () {
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

Taker.prototype.answersNumericQuestion = function (_value) {
	skipSync(true);

	this.finds('.spec-taker-answer-numeric-question-read').click();
	return this.finds('.numeric-input-number').sendKeys(_value);
};

Taker.prototype.answersNumericQuestionNoMask = function (_value) {
	this.finds('.spec-taker-answer-numeric-question').click();
	return this.finds('.numeric-input-number').sendKeys(_value);
};

Taker.prototype.answersNumericQuestionWithoutMask = function (_value) {
	return this.finds('.spec-taker-answer-numeric-question').sendKeys(_value);
};

Taker.prototype.answersPasswordConfirmQuestion = function () {
	this.finds('.spec-taker-onlineform-password-input').sendKeys('passwordtest');
	return this.finds('.spec-taker-onlineform-confirmpass-input').sendKeys('passwordtest');
};

Taker.prototype.answersPasswordQuestion = function () {
	return this.finds('.spec-taker-onlineform-password-input').sendKeys('passwordtest');
};

Taker.prototype.answersPaymentsQuestion = function () {
	this.finds('.payment-info.payment-info-number').sendKeys('424242424242424242');
	this.finds('.payment-info.payment-info-exp').sendKeys('12/20');
	return this.finds('.payment-info.payment-info-cvc').sendKeys('1234');
};

Taker.prototype.answersPhoneNumberQuestion = function () {
	var _phone = rand.getPhone();

	logger.log('input phone', _phone);

	return this.finds('.spec-taker-onlineform-numberquestion-input').sendKeys(_phone);
};

Taker.prototype.answersQuestion = function (typeOfQuestion) {
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

Taker.prototype.answersRatingQuestion = function () {
	return this.takerTouchStarts();
};

Taker.prototype.answersShortTextQuestion = function () {
	var text = rand.getText(256);
	return this.finds('.spec-taker-short-text-answers').sendKeys(text);
};

Taker.prototype.answersShortTextQuestionWidget = function () {
	var text = rand.getText(256);
	return this.finds('.textfield-area').sendKeys(text);
};

Taker.prototype.answersSlidebarQuestion = function () {
	return this.movesSlidebar(2000);
};

Taker.prototype.answersTextFieldQuestion = function () {
	var _text = rand.getText(177);
	this.waits(1300);

	var _textArea = this.finds('.spec-nps-answers-textfield');
	_textArea.sendKeys(_text);

	return _textArea.getAttribute('value').then(function (_mytext) {
		expect(_mytext.length).to.be.equal(176);
	});
};

Taker.prototype.answersUsAddressQuestion = function () {
	var _el = '.spec-taker-onlineform-emailquestion-';

	this.finds(_el + 'address-1-input').sendKeys('Calle 74');
	this.finds(_el + 'address-2-input').sendKeys('Calle 73');
	this.finds(_el + 'city-input').sendKeys('Barranquilla');
	this.finds(_el + 'state-select .selected').click();
	this.findsAll(_el + 'state-select .states span').get(1).click();
	return this.finds(_el + 'postal_code-input').sendKeys('018000');
};

Taker.prototype.answersYesNoQuestion = function () {
	var options = ['yes', 'no'];
	return this.choicesAnswer(options[Math.floor(Math.random() * options.length)]);
};

Taker.prototype.choicesAnswer = function (_type) {
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

Taker.prototype.choicesRandomAnswer = function (_type, _idx) {
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

Taker.prototype.choicesRightAnswer = function (_type, _idx) {
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

Taker.prototype.clicksOnOk = function () {
	scrollToBottom();
	return this.finds('.spec-user-response-ok').click();
};

Taker.prototype.enterInAudicencePage = function () {
	return this.finds('.spec_audiencepage_begin_poll_button').click();
};

Taker.prototype.finish = function (_confirm) {
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

Taker.prototype.getQuizStatus = function () {
	var defer = protractor.promise.defer();

	user.finds('.circle').getAttribute('class').then(function (_classes) {
		var newValue = _classes.replace('circle', '').trim();

		defer.fulfill(newValue);

		// if (newValue == 'passed') logger.info('Status', 'PASASTES');
		// else if (newValue == 'not-passed') logger.info('Status', 'PERDISTES');
	});

	return defer.promise;
};

Taker.prototype.getTypeQuestion = function (idx) {
	var defer = protractor.promise.defer();

	user.waits(500);
	user.findsAll('[data-qtype]').get(idx).getAttribute('data-qtype').then(function (_type) {
		defer.fulfill(_type);
	});

	return defer.promise;
};

Taker.prototype.movesSlidebar = function (_distance) {
	var _el = this.findsAll('.rz-pointer').first();

	brw.actions().mouseDown(_el).perform();
	this.waits(2000);
	return brw.actions().mouseMove(_el, {
		x: _distance,
		y: 0
	}).perform();
};

Taker.prototype.putCodeInAudiencePage = function (_code) {
	if (typeof _code === 'undefined') throw new Error('Error, lack the code');

	logger.log('the code is:', _code);
	return this.finds('.spec_audiencepage_enter_access_code_input').sendKeys(_code);
};

Taker.prototype.touchStarts = function () {
	var any = rand.getNumber({
		min: 0,
		max: 4
	});

	return this.finds('.spec-taker-rating-select-' + any).click();
};

Taker.prototype.touchsMultipleAnswers = function (numberOfAnswers) {
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

module.exports = new Taker();