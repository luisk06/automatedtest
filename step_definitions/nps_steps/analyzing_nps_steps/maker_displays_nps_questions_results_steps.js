'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a webform app with a nps question that has (\d+) answers with the following answers:$/, function(num, array, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test NPS').then(function(){
				as.createAnswers(_userId, 'nps', 'nps', num, array.rows()).then(function(){
					webpage.waits(5000);
				}).then(cb);
			});
		});
	});

	When(/^the user clicks on the "([^"]*)" "([^"]*)" of the just created nps$/, function(identifier, type, cb) {
		var _class = '.spec_' + identifier + '_' + type + '_' + configer.get('QrveyId');
		user.finds(_class).click().then(function() {
			var button = $('.spec-btn-filter-histogram-');
			var isClickable = EC.elementToBeClickable(button);
			brw.wait(isClickable, 20000);
		}).then(cb);
	});

	Then(/^the (\d+) date answer filter should appear in the histogram filters in the nps$/, function(arg1, cb) {
		webpage.getsTextExists(arg1).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});
};