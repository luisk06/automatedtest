'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user chose "([^"]*)" on "([^"]*)" qrvey type select$/, function(qrveyType, actionType, cb) {
		user.finds('.spec-'+actionType+'-select-qrvey-type').click().then(function(){
			user.finds('.spec-select-option-' + qrveyType).click().then(cb);
		});
	});
};
