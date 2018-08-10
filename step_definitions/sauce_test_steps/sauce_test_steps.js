module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the brw has before user session$/, function(cb) {
		brw.manage().addCookie({'name': 'foo', 'value': 'bar'});
		cb();
	});

	When(/^the user open the url site$/, function(cb) {
		user.goTo('/dashboard').then(cb);
	});

	Then(/^the user is inside the dashboard$/, function(cb) {
		brw.manage().getCookie('qrveysession').then(function(cookie) {
			// console.log('cookie test 2', cookie);
		});

		user.waitsFor('.spec_qrvey_logo');
		cb();
	});
};
