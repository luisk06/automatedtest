'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user filled up all mandatory fields$/, function(cb) {
		webpage.deleteAllCookies();
		webpage.goTo('/register');
		user_login.signup(rand.getEmail({ domain: 'gmail.com' }), '123456').then(cb);
	});

	Given(/^the user try register without password$/, function(cb) {
		webpage.deleteAllCookies();
		webpage.goTo('/register');
		element(by.css('#spec-input-useremail-register')).sendKeys(rand.getEmail({ domain: 'gmail.com' }));
		element(by.css('#spec-input-userpass-register')).sendKeys('');
		maker.finds('.tagged').click().then(function() {
			throw new Error('Password is empty');
		}, function() {
			cb();
		});
	});

	When(/^the user hits the Sing me up button$/, function(cb) {
		user_login.pressSignIn().then(cb);
	});

	Then(/^a confirmation pop up should be displayed$/, function(cb) {
		var button = $('#spec_success_message'),
			isClickable = EC.elementToBeClickable(button);

		brw.wait(isClickable, 7000);
		expect(qrvey.checkQrveyPresence('Quick Registration = Done!')).to.eventually.be.true.and.notify(cb);
	});

	//TODO: Disable animation to test modal
	// Then(/^a Quick Registration = Done! message should be displayed$/, function(cb) {
	//     expect(qrvey.checkQrveyPresence('Quick Registration = Done!')).to.eventually.be.true.and.notify(cb);
	// });

	Then(/^a Enter Qrvey button should be displayed$/, function(cb) {
		expect(qrvey.checkQrveyPresence('Enter Qrvey')).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the User already exists message should be displayed$/, function(cb) {
		expect(webpage.getCurrentUrl()).to.eventually.contain('register').and.notify(cb);
	});
};
