'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a numeric question left with (.*) option$/, function(typeOption, cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, 'survey', 'numeric', 'active', typeOption);
		}).then(function(_data) {
			user.openUrl(_data.url).then(cb);
		});
	});

	Given(/^that the user has a numeric question left with (.*) option and allow decimals checked$/, function(typeOption, cb) {
		us.isLogged().then(function(_userId) {
			var decimals = {decimal: true};
			return qs.createQrvey(appID, _userId, 'survey', 'numeric', 'active', typeOption, decimals);
		}).then(function(_data) {
			user.openUrl(_data.url).then(cb);
		});
	});

	Given(/^that the user has a "([^"]*)" with a numeric question with (.*) option and allow decimals checked$/, function(webform, typeOption, cb) {
		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, webform, 'numeric', 'active', typeOption, { decimal: true });
		}).then(function(_data) {
			user.openUrl(_data.url).then(cb);
		});
	});

	When(/^the user writes (.*) in the input$/, function(answer, cb) {
		webpage.waitsFor('.spec-taker-answer-numeric-question-read');
		taker.answersNumericQuestion(answer).then(cb);
	});

	When(/^the user writes (.*) in the numeric input$/, function(answer, cb) {
		webpage.waitsFor('.spec-taker-answer-numeric-question');
		taker.answersNumericQuestionNoMask(answer).then(cb);
	});

	When(/^the user clicks outside the input numeric field$/, function(cb) {
		element.all(by.css('h3')).first().click().then(cb);
	});

	When(/^the user clicks outside the input numeric field on the progressive$/, function(cb) {
		element.all(by.css('.progressive-name-q')).first().click().then(cb);
	});

	When(/^the user (.*) the numeric input on "([^"]*)"$/, function(sw, webform, cb) {
		var _ele;

		switch (webform) {
			case 'survey':
				_ele = user.finds('.numeric-input-text');
				break;
			case 'questionnaire':
				_ele = user.finds('.spec-taker-answer-numeric-question');
				break;
			default:
				_ele = user.finds('.numeric-input-text');
		}

		if(sw == 'focus') _ele.click().then(cb);
		else cb();
	});

	When(/^the input has (.*) as answer$/, function(answer, cb) {
		user.finds('.spec-taker-answer-numeric-question-read').getAttribute('value').then(function(_text) {
			expect(_text).to.be.equal(answer);
		}).then(cb);
	});

	When(/^the (.*) input has (.*) as answer on "([^"]*)"$/, function(sw, answer, webform, cb) {
		var _focusedInput,
			_notFocusedInput;

		switch (webform) {
			case 'survey':
				_focusedInput = user.finds('.spec-taker-answer-numeric-question');
				_notFocusedInput = user.finds('.spec-taker-answer-numeric-question-read');
				break;
			case 'questionnaire':
			case 'forms':
				_focusedInput = user.finds('.numeric-input-number');
				_notFocusedInput = user.finds('.spec-taker-answer-numeric-question');
				break;
			default:
				_focusedInput = user.finds('.spec-taker-answer-numeric-question');
				_notFocusedInput = user.finds('.spec-taker-answer-numeric-question-read');
		}

		var _el = (sw == 'focus') ?  _focusedInput : _notFocusedInput;

		_el.getAttribute('value').then(function(_text) {
			expect(_text).to.be.equal(answer);
		}).then(cb);
	});

	When(/^numeric input has (.*) as (.*) answer$/, function(answer, type, cb) {
		var _el = user.finds('.spec-taker-answer-numeric-question');

		_el.getAttribute('value').then(function(_text) {
			expect(_text).to.be.equal(answer);
		}).then(cb);
	});
};
