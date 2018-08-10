'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user open the "([^"]*)" widget$/, function (arg1, cb) {
		ws.open(arg1, qrveyIDForWidget, cb);
	});

	Given(/^that the user has a "([^"]*)" with "([^"]*)" question$/, function (typeOfQrvey, typeOfQuestion, cb) {
		us.isLogged().then(function (_userId) {
			var service = null;
			var decimals = null;

			switch (typeOfQuestion) {
				case 'multiple-choice-with-other-question':
					service = qs.createQrvey(appID, _userId, 'survey', 'multiple_choice', 'draft', 'with_other_option');
					break;
				case 'multiple-choice-allow-multiple-selections':
					service = qs.createQrvey(appID, _userId, 'survey', 'multiple_choice', 'draft', 'with_allow_multiple_selections');
					break;
				case 'multiple-choice-with-both':
					service = qs.createQrvey(appID, _userId, 'survey', 'multiple_choice', 'draft', 'with_both');
					break;
				case 'numeric-general':
					service = qs.createQrvey(appID, _userId, 'survey', 'numeric', 'draft', 'general');
					break;
				case 'numeric-number':
					service = qs.createQrvey(appID, _userId, 'survey', 'numeric', 'draft', 'number');
					break;
				case 'numeric-currency':
					service = qs.createQrvey(appID, _userId, 'survey', 'numeric', 'draft', 'currency');
					break;
				case 'numeric-percentage':
					service = qs.createQrvey(appID, _userId, 'survey', 'numeric', 'draft', 'percentage');
					break;
				case 'numeric-general-decimal':
					decimals = {decimal: true};
					service = qs.createQrvey(appID, _userId, typeOfQrvey, 'numeric', 'active', 'general', decimals);
					break;
				case 'numeric-number-decimal':
					decimals = {decimal: true};
					service = qs.createQrvey(appID, _userId, typeOfQrvey, 'numeric', 'active', 'number', decimals);
					break;
				case 'numeric-currency-decimal':
					decimals = {decimal: true};
					service = qs.createQrvey(appID, _userId, typeOfQrvey, 'numeric', 'active', 'currency', decimals);
					break;
				case 'numeric-percentage-decimal':
					decimals = {decimal: true};
					service = qs.createQrvey(appID, _userId, typeOfQrvey, 'numeric', 'active', 'percentage', decimals);
					break;
				case 'slidebar':
				case 'slidebar-with-3-stops':
					service = qs.createQrvey(appID, _userId, 'survey', 'slide_bar', 'draft', '3');
					break;
				case 'slidebar-with-5-stops':
					service = qs.createQrvey(appID, _userId, 'survey', 'slide_bar', 'draft', '5');
					break;
				case 'slidebar-with-7-stops':
					service = qs.createQrvey(appID, _userId, 'survey', 'slide_bar', 'draft', '7');
					break;
				case 'slidebar-with-9-stops':
					service = qs.createQrvey(appID, _userId, 'survey', 'slide_bar', 'draft', '9');
					break;
				default:
					service = qs.createQrvey(appID, _userId, typeOfQrvey, typeOfQuestion, 'active');
			}

			service.then(function (_qrveyId) {
				qrveyIDForWidget = _qrveyId;
				logger.info('qrveyIDForWidget', qrveyIDForWidget);
				skipSync(true);
			}).then(cb);
		});
	});

	When(/^clicks outside the question box in the widget$/, function (cb) {
		element(by.css('body')).click().then(cb);
	});

	Then(/^the question is saved in the widget$/, function (cb) {
		skipSync(false);
		cb();
	});
};