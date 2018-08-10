'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user adds a rating question$/, function(cb) {
		qrvey.questionType('spec_rt_qt');
		qrvey.fillRatingQuestion('would you rate this test?').then(cb);
	});

	When(/^the user pass to the "([^"]*)" share tab$/, function(typeOfQrvey, cb) {
		var _type = (typeOfQrvey == 'survey') ? 'share' : typeOfQrvey + '-share';

		navigate.clicksButton('.spec-tab-to-share');
		logger.log('Element -->:', '/' + _type);

		user.whereIAm().then(function(_url) {
			logger.log('Url -->:', _url);
			expect(_url).to.be.contain('share');
		}).then(cb);
	});

	When(/^the user tries to move to the "([^"]*)" share tab$/, function(typeOfQrvey, cb) {
		var _type = (typeOfQrvey == 'survey') ? 'share' : typeOfQrvey + '-share';

		navigate.clicksButton('.spec-tab-to-share');
		logger.log('Element -->:', '/' + _type);

		user.whereIAm().then(function(_url) {
			logger.log('Url -->:', _url);
			expect(_url).to.be.contain('/design');
		}).then(cb);
	});

	When(/^the user try pass to the share tab$/, function(cb) {
		user.finds('.spec-tab-to-share').click().then(cb);
	});

	When(/^the user clicks on Privacy button$/, function(cb) {
		user.finds('#spec_privacy_dropdown').click().then(function() {
			expect(user.finds('.spec_privacy_popop').isDisplayed()).to.eventually.be.true.and.notify(cb);
		});
	});

	When(/^the user selects "([^"]*)" privacy from the dropdown$/, function(typePrivacy, cb) {
		var _el = '.spec-share-change-privacy-to-' + typePrivacy.toLowerCase();

		logger.log('TYPEPRIVACY', _el);

		user.finds(_el).click().then(cb);
	});

	When(/^clicks on Activate button in "([^"]*)"$/, function(typeOfQrvey, cb) {
		var _el = user.finds('.spec-qrvey-btn-active');

		user.waitsForElement(_el);

		if(typeOfQrvey == 'forms'){
			_el.click().then(function(){
				user.waitsFor('.pause');

				user.finds('.pause').isPresent().then(function (_isPresent) {
					expect(_isPresent).to.be.true;
				}).then(cb);
			});
		}else if(typeOfQrvey == 'forms-spreadsheet'){
			user.finds('.reactivate').click().then(cb);
		}else if(typeOfQrvey == 'nps'){
			_el.click().then(cb);
		}else{
			_el.click();
			user.finds('.spec-confirm-end-qrvey .content-modal-body .modal-footer .button').click().then(cb);
		}
	});

	Given(/^that the user has a "([^"]*)" with a "([^"]*)" question to workflow/, function(typeOfQrvey, typeOfQuestion, cb) {
		var options = undefined;
		var extraOptions = undefined;

		if (typeOfQuestion == 'multiple_choice_with_allow_multiple_selections') {
			typeOfQuestion = 'multiple_choice';
			options = 'with_allow_multiple_selections';
		} else if (typeOfQuestion == 'nps_without_textfield') {
			typeOfQuestion = 'nps';
			options = 'without';
		} else if (typeOfQuestion.includes('decimal')) {
			options = typeOfQuestion.split('_')[1];
			typeOfQuestion = 'numeric';
			extraOptions = {decimal: true};
		}

		us.isLogged().then(function(_userId) {
			return qs.createQrvey(appID, _userId, typeOfQrvey, typeOfQuestion, 'active', options, extraOptions);
		}).then(function(_data) {
			logger.log('qrveys.data', _data);
			user.waits(5000);
		}).then(cb);
	});

	Then(/^the qrvey will be set to make results "([^"]*)"/, function(typePrivacy, cb) {
		element(by.binding('results_visibility')).getText().then(function(name) {
			logger.log('qrvey privacy: ' + name);
			expect(name).to.contain(typePrivacy);
		}).then(cb);
	});

	When(/^the user sets a number between (\d+) - (\d+)$/, function(arg1, arg2, cb) {
		cb();
	});

	Then(/^the duration is set$/, function(cb) {
		cb();
	});

	When(/^the user selects "([^"]*)" answers$/, function(optionAnswers, cb) {
		user.choicesAnswer(optionAnswers).then(cb);
	});
};
