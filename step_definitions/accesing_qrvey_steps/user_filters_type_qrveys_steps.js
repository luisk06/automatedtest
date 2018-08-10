'use strict';

module.exports = function() {
	
	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has qrveys of "([^"]*)" type$/, function(typeSurvey, cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, typeSurvey.toLowerCase(), 'multiple_choice', 'active').then(function(_data) {
				logger.log('qrveys.data', _data);
			}).then(cb);
		});
	});

	When(/^the user clicks on the "([^"]*)" filter by dropdown type$/, function(typeFilter, cb) {
		navigate.clicksButton('.spec_filter_by_' + typeFilter + '_dropdown').then(cb);
	});

	When(/^selects the "([^"]*)" option in the filter type$/, function(type, cb) {
		navigate.clicksButton('.spec-type-' + type.toLowerCase()).then(cb);
	});

	Then(/^only the qrveys in "([^"]*)" type should be displayed$/, function(type, cb) {
		element.all(by.repeater('qrvey in qrveys')).then(function(els) {
			els.forEach(function(ele, i, a) {
				a[i].element(by.css('.spec-qrvey-type-' + type.toLowerCase())).getAttribute('innerHTML').then(function(_state) {
					expect(_state).to.be.contain(type);
				});
			});
		}).then(cb);
	});
};
