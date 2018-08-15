'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var _question = [];

	Given(/^that the user has qrveys in "([^"]*)" state$/, function(stateSurvey, cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, 'survey', 'multiple_choice', stateSurvey.toLowerCase()).then(function(_data) {
				logger.log('qrveys.data.' + stateSurvey.toLowerCase(), _data);
			}).then(cb);
		});
	});

	When(/^the user clicks on the "([^"]*)" filter by dropdown$/, function(typeOfFilter, cb) {
		maker.finds('.spec_filter_by_' + typeOfFilter + '_dropdown').click().then(cb);
	});

	When(/^selects the "([^"]*)" option in the filter$/, function(type, cb) {
		maker.finds('.spec-status-' + type.toLowerCase()).click().then(cb);
	});

	Then(/^only the qrveys in "([^"]*)" state should be displayed$/, function(type, cb) {
		element.all(by.repeater('qrvey in qrveys')).then(function(els) {
			els.forEach(function(ele, i, a) {
				a[i].element(by.css('.spec-qrvey-status-' + type.toLowerCase())).getAttribute('innerHTML').then(function(_state) {
					expect(_state).to.be.contain(type);
				});
			});
		}).then(cb);
	});

	Given(/^that the user has qrveys$/, function(cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, 'survey', 'date').then(function(_data) {
				logger.log('qrveys.data', _data);
			}).then(cb);
		});
	});

	Given(/^the user counts the qrveys$/, function(cb) {
		element.all(by.repeater('qrvey in qrveys')).then(function(els) {
			els.forEach(function(ele, i, a) {
				a[i].element(by.css('.spec-qrvey-status')).getAttribute('innerHTML').then(function(_state) {
					_question.push(_state);
				});
			});
		}).then(cb);
	});

	Then(/^the qrveys displayed should remain the same$/, function(cb) {
		element.all(by.repeater('qrvey in qrveys')).then(function(els) {
			els.forEach(function(ele, i, a) {
				a[i].element(by.css('.spec-qrvey-status')).getAttribute('innerHTML').then(function(_state) {
					_question.push(_state);
				});
			});
		}).then(cb);
	});
};
