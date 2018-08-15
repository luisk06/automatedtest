'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects examine data app type as "([^"]*)"$/, function(qrveyType, cb) {
		maker.finds('.spec-examinedata-select-qrvey-type').click().then(function(){
			maker.finds('.spec-examinedata-qrvey-' + qrveyType).click().then(cb);
		});
	});

	When(/^the user selects qrvey number (\d+) from the "([^"]*)" list$/, function(optionNumber, actionType, cb) {
		maker.finds('.spec-'+ actionType +'-select-qrvey').click().then(function(){
			maker.finds('.spec-'+actionType+'-qrvey-option-' + optionNumber).click().then(cb);
		});
	});

	When(/^the user opens the first webform$/, function(cb) {
		element.all(by.css('a.spec-qrvey-title-link.qrvey-title-desktop')).first().click().then(cb);
	});

	When(/^the user creates a new webform$/, function(cb) {
		webpage.waitsFor('.chooseapp-cta');
		element(by.css('.chooseapp-cta')).click().then(cb);
	});
};